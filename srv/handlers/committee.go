package handlers

import (
	"net/http"

	"github.com/Cocos-BCX/VoteCocosBCX/srv/config"

	"github.com/gin-gonic/gin"
)

type CommitteeSupporter struct {
	AccountID  string    `json:"account_id"`
	AccountRaw AmountRaw `json:"account_raw"`
	AmountText string    `json:"amount_text"`
}

type CommitteeInfo struct {
	AccountID       string               `json:"account_id"`
	AccountName     string               `json:"account_name"`
	Active          bool                 `json:"active"`
	CommitteeID     string               `json:"committee_id"`
	Supported       bool                 `json:"supported"`
	Supporters      []CommitteeSupporter `json:"supporters"`
	Type            string               `json:"type"`
	Url             string               `json:"url"`
	VoteID          string               `json:"vote_id"`
	Votes           string               `json:"votes"`
	Country         string               `json:"country"`
	Logo            string               `json:"logo"`
	SupportersCount uint64               `json:"supporters_count"`
	Ranking         uint                 `json:"ranking"`
}

type CommitteeRequest struct {
	Committee []CommitteeInfo `json:"committee" binding:"required"`
}

func Committee(c *gin.Context) {
	var req CommitteeRequest
	lang := c.MustGet("lang").(string)
	committeeConfig := config.GetConfig().Committee
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"result": false,
			"error":  "request struct error",
		})
		return
	}
	for k, v := range req.Committee {
		if commit, ok := committeeConfig[v.CommitteeID]; ok {
			req.Committee[k].Country = commit.Country[lang]
			req.Committee[k].Logo = commit.Logo
		}

	}
	c.JSON(http.StatusOK, gin.H{
		"result": req.Committee,
		"error":  "ok",
	})
	return
}
