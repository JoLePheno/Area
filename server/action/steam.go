package action

import (
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/reaction"
	"encoding/json"
	"time"

	"github.com/mitchellh/mapstructure"
	"github.com/parnurzeal/gorequest"
)

func SteamSales(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")
	_, body, err := gorequest.New().Get("http://store.steampowered.com/api/featuredcategories").End()
	if err != nil {
		return
	}

	var salesObj response.SteamSalesResponse
	if err := json.Unmarshal([]byte(body), &salesObj); err != nil {
	}

	if len(salesObj.Specials.Items) == 0 {
		return
	}

	var userSteamSales []response.SteamGame
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &userSteamSales)
	}

	for i, game := range userSteamSales {
		if game.DiscountExpiration < time.Now().Unix() {
			userSteamSales = append(userSteamSales[:i], userSteamSales[i+1:]...)
		}
	}

	var sales []response.SteamGame

	for _, game := range salesObj.Specials.Items {
		if game.Discounted == true {
			exist := false
			for _, userSteamSale := range userSteamSales {
				if game.Name == userSteamSale.Name {
					exist = true
				}
			}
			if exist == false {
				sales = append(sales, game)
				userSteamSales = append(userSteamSales, game)
			}
		}
	}

	if len(sales) == 0 {
		return
	}

	area.UserData[user.Id.Hex()] = userSteamSales
	_ = Area.UpdateId(area.Id, &area)
	reaction.SteamSales(sales, user)
	return
}
