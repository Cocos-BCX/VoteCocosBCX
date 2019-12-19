package handlers

import (
	"fmt"
	"net/http"
	"regexp"
	"time"

	"github.com/Cocos-BCX/VoteCocosBCX/srv/models"
	"github.com/gin-gonic/gin"
)

var (
	regCocos = regexp.MustCompile("^COCOS[0-9a-zA-Z]{50}$")
)

type ApplicationRequest struct {
	TypeOfIdentity  uint   `json:"type_of_identity" binding:"gte=0,lte=1"`
	TypeOfDirection uint   `json:"type_of_direction" binding:"gte=0,lte=1"`
	Name            string `json:"name" binding:"required"`
	MobilePhone     string `json:"mobile_phone" binding:"required"`
	TelPhone        string `json:"tel_phone"`
	Email           string `json:"email" binding:"required,email"`
	Weixin          string `json:"weixin" binding:"required"`
	Country         string `json:"country" binding:"required"`
	City            string `json:"city" binding:"required"`
	Website         string `json:"website"`
	CocosAddress    string `json:"cocos_address" binding:"required"`
	Summary         string `json:"sunmary" binding:"required,lt=3000,gte=1"`
}

func Application(c *gin.Context) {
	var req ApplicationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Printf("Application ShouldBindJSON error:%v\n", err.Error())
		c.JSON(http.StatusOK, gin.H{
			"result": false,
			"error":  "request struct error",
		})
		return
	}
	// if !regCocos.MatchString(req.CocosAddress) {
	// 	c.JSON(http.StatusOK, gin.H{
	// 		"result": false,
	// 		"error":  "invalid cocos address",
	// 	})
	// 	return
	// }
	res, err := models.QueryCocosAccount(req.CocosAddress)
	if err != nil {
		fmt.Printf("QueryCocosAccount error:%v\n", err)
		c.JSON(http.StatusOK, gin.H{
			"result": false,
			"error":  "service unavailable",
		})
		return
	}
	if res != true {
		c.JSON(http.StatusOK, gin.H{
			"result": false,
			"error":  "invalid cocos address",
		})
		return
	}

	now := time.Now()
	apply := models.Application{
		TypeOfIdentity:  req.TypeOfIdentity,
		TypeOfDirection: req.TypeOfDirection,
		Name:            req.Name,
		MobilePhone:     req.MobilePhone,
		TelPhone:        req.TelPhone,
		Email:           req.Email,
		Weixin:          req.Weixin,
		Country:         req.Weixin,
		City:            req.City,
		Website:         req.Website,
		CocosAddress:    req.CocosAddress,
		Summary:         req.Summary,
		CreatedTime:     now.Unix(),
	}
	if err := apply.Save(); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"result": false,
			"error":  "service unavailable",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": nil,
		"error":  "ok",
	})
}
