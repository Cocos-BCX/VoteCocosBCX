package handlers

import (
	"net/http"

	"github.com/Cocos-BCX/VoteCocosBCX/srv/models"
	"github.com/gin-gonic/gin"
)

type MortgageRequest struct {
	AccountID string `json:"account_id" binding:"required"`
	Type      string `json:"type" binding:"required"`
}

var (
	MortgageRequestType = map[string]string{
		"mortgager":   "mortgager",
		"beneficiary": "beneficiary",
		"all":         "all",
	}
)

func Mortgage(c *gin.Context) {
	var req MortgageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"result": false,
			"error":  "request struct error",
		})
		return
	}
	if _, ok := MortgageRequestType[req.Type]; !ok {
		c.JSON(http.StatusOK, gin.H{
			"result": false,
			"error":  "request type error",
		})
		return
	}

	results, err := models.QueryMortgage(req.AccountID, req.Type)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"result": false,
			"error":  "not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": results,
		"error":  "ok",
	})
	return

}
