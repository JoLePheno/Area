package reaction

import (
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/utils"
	"strconv"
	"time"
)

func SteamSales(steamGames []response.SteamGame, user models.User) {
	body :=  "Sales games:"
	for _, game := range steamGames {
		body += "<br />" + strconv.Itoa(game.DiscountPercent) + "% off on " + game.Name + " <strike>" + strconv.Itoa(game.OriginalPrice / 100) + " " + game.Currency + "</strike> " + strconv.Itoa(game.FinalPrice / 100) + " " + game.Currency + " expire " + time.Unix(game.DiscountExpiration, 0).String()
	}
	_ = utils.SendEmail(user.Email, "Steam sales", body)
}
