package models

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/Cocos-BCX/VoteCocosBCX/srv/config"
)

type Application struct {
	ID              uint   `gorm:"primary_key" json:"id"`
	TypeOfIdentity  uint   `json:"type_of_identity"`
	TypeOfDirection uint   `json:"type_of_direction"`
	Name            string `json:"name"`
	MobilePhone     string `json:"mobile_phone" `
	TelPhone        string `json:"tel_phone"`
	Email           string `json:"email"`
	Weixin          string `json:"weixin"`
	Country         string `json:"country"`
	City            string `json:"city"`
	Website         string `json:"website"`
	CocosAddress    string `json:"cocos_address" `
	Summary         string `json:"sunmary"`
	CreatedTime     int64  `json:"created_time"`
}

type QueryAccount struct {
	ID      int    `json:"id"`
	Jsonrpc string `json:"jsonrpc"`
	Result  [][]interface{}
}

func (apply *Application) Save() error {
	ret := db.Model(&Application{}).Create(apply)
	if ret.Error != nil {
		return ret.Error
	}
	return nil
}

func QueryCocosAccount(account string) (bool, error) {
	url := config.GetConfig().ApiUrl
	res, err := VerifyCocosAccount(url, account)
	fmt.Println(res)
	if err != nil {
		return false, err
	}
	var cocosAccount QueryAccount

	if err := json.Unmarshal([]byte(res), &cocosAccount); err != nil {
		return false, err
	}
	if len(cocosAccount.Result) > 0 && len(cocosAccount.Result[0]) > 0 && cocosAccount.Result[0][0] == account {
		return true, nil
	}
	return false, nil
}

func VerifyCocosAccount(url, account string) (string, error) {
	param := `{
		"id": 1,
		"method": "call",
		"params": [
			0,
			"get_full_accounts",
			[
				[
					"%s"
				],
				false
			]
		],
		"jsonrpc": "2.0"
	}`
	param = fmt.Sprintf(param, account)
	result, err := GetFullAccounts(url, param)
	if err != nil {
		return "", err
	}
	return result, nil
}

func GetFullAccounts(url string, param string) (string, error) {
	httpClient := &http.Client{}

	request, err := http.NewRequest("POST", url, strings.NewReader(param))
	if nil != err {
		return err.Error(), err
	}
	//request.Header.Add("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36")
	request.Header.Add("Content-Type", "application/json")
	//request.Header.Add("Accept-Language", "zh-cn")

	response, err := httpClient.Do(request)

	if nil != err {
		return err.Error(), err
	}
	if response != nil {
		defer response.Body.Close()
	}
	body, err := ioutil.ReadAll(response.Body)
	if nil != err {
		return err.Error(), err
	}

	return string(body), nil
}
