package middleware

import (
	"github.com/Cocos-BCX/VoteCocosBCX/srv/config"
	"github.com/gin-gonic/gin"
)

var (
	Language string
)

func LanguageMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		langs := config.GetConfig().Langs
		Language = langs.Default
		lang := c.DefaultQuery("lang", langs.Default)
		for _, allowLang := range langs.Allows {
			if allowLang == lang {
				Language = lang
			}
		}
		c.Set("lang", Language)
		c.Next()
	}
}
