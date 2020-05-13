package models

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"log"
	"time"
)

type WitnessGeneratedBlockNumber struct {
	Id  string `bson:"_id,omitempty"`
	LastBlockTime string `json:"last_block_time"`
	WitnessAccountName string `json:"witness_account_name" bson:"witness_account_name"`
	Total string  `json:"total" bson:"total"`
	LastBlock string `json:"last_block"`
	WitnessAccountId string `json:"witness_account_id" bson:"witness_account_id"`
	WitnessId string `json:"witness_id" bson:"witness_id"`

}

func FindWitnessesGeneratedBlockNumber() (map[string]WitnessGeneratedBlockNumber, error) {
	results := map[string]WitnessGeneratedBlockNumber{}
	query := bson.D{}
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cursor, err := BlockCollection.Find(ctx, query)
	if err != nil {
		log.Println(err)
		return results, err
	}
	defer func() {
		_ = cursor.Close(ctx)
	}()
	for cursor.Next(ctx) {
		var data WitnessGeneratedBlockNumber
		err := cursor.Decode(&data)
		if err != nil {
			log.Println(err)
			continue
		}
		results[data.WitnessId] = data
	}
	return results, nil
}
