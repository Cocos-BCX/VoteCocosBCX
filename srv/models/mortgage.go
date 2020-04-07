package models

import (
	"context"
	"time"

	"github.com/Cocos-BCX/VoteCocosBCX/srv/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MortgageData struct {
	ID             primitive.ObjectID `json:"-" bson:"_id"`
	BlockNum       int32              `json:"block_num" bson:"block_num"`
	Mortgager      string             `json:"mortgager" bson:"mortgager"`
	Beneficiary    string             `json:"beneficiary" bson:"beneficiary"`
	TransactionsID string             `json:"transactions_id" bson:"transactions_id"`
	Collateral     string             `json:"collateral" bson:"collateral"`
	Time           string             `json:"time" bson:"time"`
}

func QueryMortgage(accountID, mold string) ([]MortgageData, error) {
	cfg := config.GetConfig().Mongo
	col := mongoClient.Database(cfg.Database).Collection(cfg.Collection)

	var query bson.M
	var res []MortgageData
	switch mold {
	case "mortgager":
		query = bson.M{"mortgager": accountID}
	case "beneficiary":
		query = bson.M{"beneficiary": accountID}
	case "all":
		query = bson.M{
			"$or": []bson.M{bson.M{"mortgager": accountID}, bson.M{"beneficiary": accountID}},
		}
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := col.Find(ctx, query)

	if err != nil {
		return res, err
	}

	if err := cursor.All(context.TODO(), &res); err != nil {
		return res, err
	}

	return res, nil
}
