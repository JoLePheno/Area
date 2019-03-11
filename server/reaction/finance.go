package reaction

import (
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/utils"
	"github.com/mitchellh/mapstructure"
)

func Bpi(currencyList response.CurrencyList, user models.User, area models.Area) {
	body := ""

	var params []string
	_ = mapstructure.Decode(area.Params, &params)
	for _, param := range params {
		if param == "USD" {
			body += "<br />" + currencyList.USD.Rate + " " + currencyList.USD.Description
		} else if param == "EUR" {
			body += "<br />" + currencyList.EUR.Rate + " " + currencyList.EUR.Description
		} else if param == "GBP" {
			body += "<br />" + currencyList.GBP.Rate + " " + currencyList.GBP.Description
		}
	}
	_ = utils.SendEmail(user.Email, "[Finance] Bitcoin Price Index", body)
}