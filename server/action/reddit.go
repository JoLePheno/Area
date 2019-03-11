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

func FreeGamesOnSteam(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")
	_, body, err := gorequest.New().Get("https://www.reddit.com/r/FreeGamesOnSteam/new.json").Set("User-Agent", "Area").End()
	if err != nil {
		return
	}

	var threadResponse response.RedditThreadResponse
	if err := json.Unmarshal([]byte(body), &threadResponse); err != nil {
	}

	var userThreads []response.RedditThreadInfo
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &userThreads)
	}

	var threads []response.RedditThreadInfo

	for _, thread := range threadResponse.Data.Children {
		exist := false
		for _, userThread := range userThreads {
			if thread.Data.Title == userThread.Data.Title {
				exist = true
			}
		}
		if exist == false {
			threads = append(threads, thread)
			userThreads = append(userThreads, thread)
		}
	}

	if len(threads) == 0 {
		return
	}

	area.UserData[user.Id.Hex()] = userThreads
	_ = Area.UpdateId(area.Id, &area)
	reaction.FreeGamesOnSteam(threads, user)
}

func FollowSubReddit(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")

	var userThreads []response.RedditThreadInfo
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &userThreads)
	}

	var subreddits []string
	_ = mapstructure.Decode(area.Params, &subreddits)
	for _, subreddit := range subreddits {
		_, body, err := gorequest.New().Get("https://www.reddit.com/r/" + subreddit + "/new.json").Set("User-Agent", "Area").End()
		if err != nil {
			return
		}

		var threadResponse response.RedditThreadResponse
		if err := json.Unmarshal([]byte(body), &threadResponse); err != nil {
		}

		var threads []response.RedditThreadInfo

		for _, thread := range threadResponse.Data.Children {
			exist := false
			for _, userThread := range userThreads {
				if thread.Data.Title == userThread.Data.Title {
					exist = true
				}
			}
			if exist == false {
				threads = append(threads, thread)
				userThreads = append(userThreads, thread)
			}
		}

		if len(threads) == 0 {
			return
		}
		reaction.FollowSubReddit(threads, user, subreddit)
	}

	area.UserData[user.Id.Hex()] = userThreads
	_ = Area.UpdateId(area.Id, &area)
}