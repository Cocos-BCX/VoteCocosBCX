package models

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type WitnessGeneratedBlockNumber struct {
	Id  string `bson:"_id,omitempty"`
	Num int64  `json:"num"`
}

func FindWitnessesGeneratedBlockNumber() (map[string]WitnessGeneratedBlockNumber, error) {
	results := map[string]WitnessGeneratedBlockNumber{}
	query := bson.D{
		{"$group", bson.D{
			{"_id", "$witness"},
			{"num", bson.D{
				{"$sum", 1},
			}},
		}},
	}

	opts := options.Aggregate().SetMaxTime(2 * time.Second)
	cursor, err := Collection.Aggregate(context.TODO(), mongo.Pipeline{query}, opts)
	if err != nil {
		return results, err
	}

	var res []WitnessGeneratedBlockNumber
	if err = cursor.All(context.TODO(), &res); err != nil {
		return results, err
	}

	for _, result := range res {
		results[result.Id] = result
	}
	return results, nil
}
