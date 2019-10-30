package handlers

import (
	"net/http"

	"github.com/Cocos-BCX/VoteCocosBCX/srv/config"

	"github.com/gin-gonic/gin"
)

type AmountRaw struct {
	Amount  float64 `json:"amount"`
	AssetID string  `json:"asset_id"`
}

type WitnessSupporter struct {
	AccountID  string    `json:"account_id"`
	AccountRaw AmountRaw `json:"account_raw"`
	AmountText string    `json:"amount_text"`
}

type Witness struct {
	AccountID             string             `json:"account_id"`
	AccountName           string             `json:"account_name"`
	Active                bool               `json:"active"`
	LastAslot             uint64             `json:"last_aslot"`
	LastConfirmedBlockNum uint64             `json:"last_confirmed_block_num"`
	Supported             bool               `json:"supported"`
	Supporters            []WitnessSupporter `json:"supporters"`
	TotalMissed           uint64             `json:"total_missed"`
	Type                  string             `json:"type"`
	Url                   string             `json:"url"`
	VoteID                string             `json:"vote_id"`
	Votes                 string             `json:"votes"`
	WitnessID             string             `json:"witness_id"`
	Country               string             `json:"country"`
	Logo                  string             `json:"logo"`
	GeneratedBlockNum     int64              `json:"generated_block_num"`
	Ranking               uint               `json:"ranking"`
	SupportersCount       uint64             `json:"supporters_count"`
}

type WitnessesRequest struct {
	Witnesses []Witness `json:"witnesses" binding:"required"`
}

func Witnesses(c *gin.Context) {
	var req WitnessesRequest
	witnessesConfig := config.GetConfig().Witnesses
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"result": false,
			"error":  "request struct error",
		})
		return
	}
	for k, v := range req.Witnesses {
		if witness, ok := witnessesConfig[v.WitnessID]; ok {
			req.Witnesses[k].Country = witness.Country
			req.Witnesses[k].Logo = witness.Logo
		}

	}
	c.JSON(http.StatusOK, gin.H{
		"result": req.Witnesses,
		"error":  "ok",
	})
	return
}
