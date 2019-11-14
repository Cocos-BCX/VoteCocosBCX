package models

import (
	"context"
	"time"

	"github.com/Cocos-BCX/VoteCocosBCX/srv/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	DB         *mongo.Client
	Collection *mongo.Collection
)

func Init(cfg config.MongoConfig) error {
	if DB != nil {
		return nil
	}
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(cfg.Uri))
	if err != nil {
		return err
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return err
	}
	DB = client
	Collection = client.Database(cfg.Database).Collection(cfg.Collection)
	return nil
}
func Close() {
	if DB != nil {
		_ = DB.Disconnect(context.TODO())
	}
}
