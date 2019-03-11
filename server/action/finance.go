package action

import (
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/reaction"
	"encoding/json"
	"github.com/mitchellh/mapstructure"
	"github.com/parnurzeal/gorequest"
)

func Bpi(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")
	_, body, err := gorequest.New().Get("https://api.coindesk.com/v1/bpi/currentprice.json").End()
	if err != nil {
		return
	}

	var response response.BpiResponse
	if err := json.Unmarshal([]byte(body), &response); err != nil {
	}

	var lastUpdated string
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &lastUpdated)
	}

	if response.Time.Updated != lastUpdated {
		area.UserData[user.Id.Hex()] = response.Time.Updated
		_ = Area.UpdateId(area.Id, &area)
		reaction.Bpi(response.Bpi, user, area)
	}
}