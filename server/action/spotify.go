package action

import (
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/reaction"
	"encoding/json"
	"fmt"
	"github.com/mitchellh/mapstructure"
	"github.com/parnurzeal/gorequest"
	"time"
)

var _token string

func funcFind(resp []response.SpotifyUserFollowItems, artist string) bool {
	for _, n := range resp {
		if artist == n.Name {
			return false
		}
	}
	return true
}

func SpotifyArtistFollow(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")
	//Service := config.MongoSession.Model("Service")

	_token = service.AccessToken
	request := gorequest.New()
	_url := "https://api.spotify.com/v1/me"
	_, body, errs := request.Get(_url).Set("User-Agent", "Area").Set("Authorization", "Bearer "+_token).End()

	if errs != nil {
		fmt.Printf("Think to put the right access token\n")
		fmt.Printf("error: %s\n", errs)
		return
	}

	var objUser response.SpotifyUser
	if err := json.Unmarshal([]byte(body), &objUser); err != nil {
		fmt.Printf("error: %s\n", err.Error())
		return
	}
	request = gorequest.New()
	_, body, errs = request.Get("https://api.spotify.com/v1/me/following?type=artist").Set("User-Agent", "Area").Set("Authorization", "Bearer "+_token).End()

	if errs != nil {
		fmt.Printf("error: %s\n", errs)
		return
	}
	var obj response.SpotifyUserFollowBody
	if err := json.Unmarshal([]byte(body), &obj); err != nil {
		fmt.Printf("error: %s\n", err.Error())
		return
	}

	if len(obj.Artist.Items) == 0 {
		fmt.Println("obj = null")
		return
	}

	var artistName = obj.Artist
	var tmp = response.SpotifyUserFollowArtists{}
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &tmp)
	}
	if len(artistName.Items) > len(tmp.Items) {
		for _, value := range artistName.Items {
			str := value.Name
			if funcFind(tmp.Items, str) {
				reaction.CreatePlaylistNewFollow(value, _token, objUser)
			}
		}
	}
	area.UserData[user.Id.Hex()] = artistName
	_ = Area.UpdateId(area.Id, &area)
	return
}

func inTimeSpan(start, end, check time.Time) bool {
	return check.After(start) && check.Before(end)
}

func UserTopTrackDay(area models.Area, user models.User, service models.Service) {
	var tmp []time.Time
	var tab []time.Time
	Area := config.MongoSession.Model("Area")

	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &tmp)
	}
	if len(tmp) == 0 {
		createdAt := time.Now()
		expiresAt := time.Now().Add(24 * time.Hour)
		tab = append(tab, createdAt)
		tab = append(tab, expiresAt)
		area.UserData[user.Id.Hex()] = tab
		_ = Area.UpdateId(area.Id, &area)
		reaction.SpotifySendDailyEmail(user)
	} else if !inTimeSpan(tmp[0], tmp[1], time.Now()) {
		createdAt := time.Now()
		expiresAt := time.Now().Add(24 * time.Hour)
		tab = append(tab, createdAt)
		tab = append(tab, expiresAt)
		area.UserData[user.Id.Hex()] = tab
		_ = Area.UpdateId(area.Id, &area)
		reaction.SpotifySendDailyEmail(user)
	}
	return
}

func CurrentTrackInfo(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")
	var tmp string

	_token = service.AccessToken
	request := gorequest.New()
	_url := "https://api.spotify.com/v1/me/player/currently-playing"
	_, body, errs := request.Get(_url).Set("User-Agent", "Area").Set("Authorization", "Bearer "+_token).End()

	if errs != nil {
		fmt.Printf("Think to put the right access token\n")
		fmt.Printf("error: %s\n", errs)
		return
	}

	var objUser response.SpotifyUserCurrent
	if err := json.Unmarshal([]byte(body), &objUser); err != nil {
		fmt.Printf("error: %s\n", err.Error())
		return
	}
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &tmp)
	}
	if tmp == "" || tmp == objUser.Items.SongName {
		reaction.SpotifySendEmailCurrentTrack(user, objUser)
	}
	area.UserData[user.Id.Hex()] = objUser.Items.SongName
	_ = Area.UpdateId(area.Id, &area)
}
