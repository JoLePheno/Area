package reaction

import (
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/utils"
)

func FreeGamesOnSteam(threads []response.RedditThreadInfo, user models.User) {
	body :=  "Free games:"
	for _, thread := range threads {
		body += "<br /><br />" + thread.Data.Title + "<br />link to the game " + thread.Data.Url + " <br />link to the thread https://www.reddit.com/" + thread.Data.Permalink
	}
	_ = utils.SendEmail(user.Email, "Free Steam Games", body)
}

func FollowSubReddit(threads []response.RedditThreadInfo, user models.User, subreddit string ) {
	body := subreddit + ":"
	for _, thread := range threads {
		body += "<br /><br />" + thread.Data.Title + " <br />link to the thread https://www.reddit.com/" + thread.Data.Permalink
	}
	_ = utils.SendEmail(user.Email, "[Reddit]" + subreddit, body)
}