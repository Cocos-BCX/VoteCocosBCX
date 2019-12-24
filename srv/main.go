package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/Cocos-BCX/VoteCocosBCX/srv/config"
	"github.com/Cocos-BCX/VoteCocosBCX/srv/handlers"
	"github.com/Cocos-BCX/VoteCocosBCX/srv/middleware"
	"github.com/Cocos-BCX/VoteCocosBCX/srv/models"
	limit "github.com/aviddiviner/gin-limit"
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

var (
	configFile *string
)

func main() {
	configFile = flag.String("C", "config.json", "configuration file")
	flag.Parse()
	cfg, err := config.Init(configFile)
	if err != nil {
		panic(err)
	}
	fmt.Printf("config:%#v\n", cfg)

	// init mongo

	if err := models.Init(cfg.Mongo); err != nil {
		panic(err)
	}
	if err := models.InitMySQL(&cfg.Mysql); err != nil {
		panic(err)
	}
	r := InitRouter(cfg)

	r.Use(middleware.LanguageMiddleware())

	v1 := r.Group("/api/v1")
	{
		v1.POST("/witnesses", handlers.Witnesses)
		v1.POST("/committee", handlers.Committee)
		v1.POST("/mortgage", handlers.Mortgage)
		v1.POST("/application", handlers.Application)
	}

	if err := r.Run(cfg.Server.ListenAddr); err != nil {
		panic(err)
	}
	quit := make(chan os.Signal)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	models.CloseMySQL()
}

func InitRouter(cfg config.Configuration) *gin.Engine {
	r := gin.Default()
	r.Use(gin.Recovery())
	r.Use(gzip.Gzip(gzip.DefaultCompression))
	r.Use(cors.Default())
	if cfg.Server.LimitConnection > 0 {
		r.Use(limit.MaxAllowed(cfg.Server.LimitConnection))
	}
	r.HandleMethodNotAllowed = true
	r.NoMethod(func(c *gin.Context) {
		c.JSON(http.StatusMethodNotAllowed, gin.H{
			"result": false,
			"error":  "Method Not Allowed",
		})
		return
	})
	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{
			"result": false,
			"error":  "Endpoint Not Found",
		})
		return
	})

	return r
}
