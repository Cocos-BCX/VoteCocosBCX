package models

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

type WitnessGeneratedBlockNumber struct {
	Id  string `bson:"_id,omitempty"`
	WitnessAccountName string `json:"witness_account_name"`
	WitnessAccountId string `json:"witness_account_id"`
	WitnessId string `json:"witness_id"`
	Total string  `json:"total"`
}

func FindWitnessesGeneratedBlockNumber() (map[string]WitnessGeneratedBlockNumber, error) {
	results := map[string]WitnessGeneratedBlockNumber{}
	query := bson.D{}
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cursor, err := BlockCollection.Find(ctx, query)
	if err != nil {
		return results, err
	}
	var res []WitnessGeneratedBlockNumber
	if err = cursor.All(ctx, &res); err != nil {
		return results, err
	}
	for _, result := range res {
		results[result.WitnessId] = result
	}
	return results, nil
}
