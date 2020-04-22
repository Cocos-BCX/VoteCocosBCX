package models

import (
	"context"
	"time"

	"github.com/Cocos-BCX/VoteCocosBCX/srv/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	mongoClient *mongo.Client
	Collection  *mongo.Collection
	BlockCollection  *mongo.Collection
)

func Init(cfg config.MongoConfig) error {
	if mongoClient != nil {
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
	mongoClient = client
	Collection = mongoClient.Database(cfg.Database).Collection(cfg.Collection)
	BlockCollection = mongoClient.Database(cfg.Database).Collection(cfg.BlockCollection)

	return nil
}
func Close() {
	if mongoClient != nil {
		_ = mongoClient.Disconnect(context.TODO())
	}
}
