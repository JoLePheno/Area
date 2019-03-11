package action

import (
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/reaction"
	"encoding/json"
	"github.com/mitchellh/mapstructure"
	"github.com/parnurzeal/gorequest"
	"time"
)

var weatherApiKey = "709d4621dcc372b0700721c33ab33ffd"

func Weather(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")
	_, body, err := gorequest.New().Get("http://api.openweathermap.org/data/2.5/forecast?q=" + area.Params.(string) + ",fr&APPID=" + weatherApiKey).End()
	if err != nil {
		return
	}

	var weather response.WeatherResponse
	if err := json.Unmarshal([]byte(body), &weather); err != nil {
	}

	var lastWeather int64 = 0
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &lastWeather)
	}

	if lastWeather == 0 || time.Now().Unix() - lastWeather >= 86400 {
		area.UserData[user.Id.Hex()] = int64(time.Now().Unix())
		_ = Area.UpdateId(area.Id, &area)
		reaction.WeatherInfo(weather, user)
	}
}

func Sunset(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")
	var coords []string
	error := mapstructure.Decode(area.Params, &coords)
	if error != nil {
		return
	}

	_, body, err := gorequest.New().Get("https://api.sunrise-sunset.org/json?lat=" + coords[0] + "&lng=" + coords[1]).End()
	if err != nil {
		return
	}

	var sunSet response.SunResponse
	if err := json.Unmarshal([]byte(body), &sunSet); err != nil {
		return
	}

	var lastSunset int64 = 0
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &lastSunset)
	}

	if lastSunset == 0 || time.Now().Unix() - lastSunset >= 86400 {
		area.UserData[user.Id.Hex()] = int64(time.Now().Unix())
		_ = Area.UpdateId(area.Id, &area)
		reaction.Sunset(sunSet, user)
	}
}

func Sunrise(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")
	var coords []string
	error := mapstructure.Decode(area.Params, &coords)
	if error != nil {
		return
	}

	_, body, err := gorequest.New().Get("https://api.sunrise-sunset.org/json?lat=" + coords[0] + "&lng=" + coords[1]).End()
	if err != nil {
		return
	}

	var sunrise response.SunResponse
	if err := json.Unmarshal([]byte(body), &sunrise); err != nil {
		return
	}

	var lastSunrise int64 = 0
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &lastSunrise)
	}

	if lastSunrise == 0 || time.Now().Unix() - lastSunrise >= 86400 {
		area.UserData[user.Id.Hex()] = int64(time.Now().Unix())
		_ = Area.UpdateId(area.Id, &area)
		reaction.Sunrise(sunrise, user)
	}
}
