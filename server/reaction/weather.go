package reaction

import (
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/utils"
	"strconv"
)

func WeatherInfo(weather response.WeatherResponse, user models.User) {
	body :=  "Today the weather is " + weather.List[0].Weather[0].Description + "<br />The temperature will be around " + strconv.FormatFloat(weather.List[0].Main.Temp - 273, 'f', -1, 64)	+ " and humidity around " + strconv.Itoa(weather.List[0].Main.Humidity) + "%"

	_ = utils.SendEmail(user.Email, "Weather for today", body)
}

func Sunset(response response.SunResponse, user models.User) {
	body :=  "Tonight the sun sets at " + response.Results.Sunset

	_ = utils.SendEmail(user.Email, "Sun set this evening", body)
}


func Sunrise(response response.SunResponse, user models.User) {
	body :=  "Tomorrow the Sun rises at " + response.Results.Sunrise

	_ = utils.SendEmail(user.Email, "Tomorrow's sun rise", body)
}