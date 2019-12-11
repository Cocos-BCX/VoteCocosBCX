package models

import (
	"fmt"
	"time"

	"github.com/Cocos-BCX/VoteCocosBCX/srv/config"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var db *gorm.DB

func InitMySQL(cfg *config.MysqlConfig) error {
	var err error
	dialect := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.User, cfg.Password, cfg.Host, cfg.Port, cfg.DbName)
	db, err = gorm.Open(cfg.Driver, dialect)
	if err != nil {
		return err
	}
	db.DB().SetMaxOpenConns(50)
	db.DB().SetMaxIdleConns(5)
	db.DB().SetConnMaxLifetime(time.Second * 10)
	if err := db.DB().Ping(); err != nil {
		return err
	}
	db = db.Debug()

	return nil
}

func CloseMySQL() error {
	fmt.Println("close mysql connect")
	if db != nil {
		return db.DB().Close()
	}
	return nil
}
