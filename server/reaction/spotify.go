package reaction

import (
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/utils"
	"encoding/json"
	"fmt"
	"github.com/parnurzeal/gorequest"
)

func CreatePlaylistNewFollow(artist response.SpotifyUserFollowItems, token string, objUser response.SpotifyUser) {
	request := gorequest.New()
	_url := "https://api.spotify.com/v1/artists/" + artist.Id + "/top-tracks?country=FR"
	resp, body, errs := request.Get(_url).Set("User-Agent", "Area").Set("Authorization", "Bearer "+token).End()

	if errs != nil {
		fmt.Printf("error: %s\n", errs)
		return
	}
	fmt.Printf("Status: %s\n", resp.Status)

	var obj response.SpotifyArtistTracks
	if err := json.Unmarshal([]byte(body), &obj); err != nil {
		fmt.Printf("error: %s\n", err.Error())
		return
	}

	var best []string
	for _, value := range obj.Tracks {
		if len(best) < 5 {
			best = append(best, value.Uri)
		}
	}
	data := `{"name": "playlisttestspotify` + artist.Name + `", "description": "Create from go server", "public": false}`
	request = gorequest.New()
	_url = "https://api.spotify.com/v1/users/" + objUser.UserId + "/playlists"
	fmt.Printf("Start request create playlist\n")
	resp, body, errs = request.Post(_url).Set("User-Agent", "Area").Set("Authorization", "Bearer "+token).Send(data).End()
	if errs != nil {
		fmt.Printf("error: %s\n", errs)
		return
	}
	var objPlaylist response.SpotifyPlaylistCreate
	if err := json.Unmarshal([]byte(body), &objPlaylist); err != nil {
		fmt.Printf("error: %s\n", err.Error())
		return
	}
	request = gorequest.New()
	str_request := "uris="
	for _, str := range best {
		str_request += str + ","
	}
	str_request = str_request[:]
	_url = "https://api.spotify.com/v1/playlists/" + objPlaylist.PlaylistId + "/tracks?" + str_request
	resp, body, errs = request.Post(_url).Set("User-Agent", "Area").Set("Authorization", "Bearer "+token).End()
	if errs != nil {
		fmt.Printf("error: %s\n", errs)
		return
	}
}

func SpotifySendDailyEmail(user models.User) {
	var body string
	body += "<br />" + "Best artist played today: 21 savage"
	_ = utils.SendEmail(user.Email, "[Spotify] Best artist played today", body)
}

func SpotifySendEmailCurrentTrack(user models.User, objUser response.SpotifyUserCurrent) {
	var body string
	body += "<br />" + "Song name: " + objUser.Items.SongName
	body += "<br />" + "Artist name: " + objUser.Items.Artist[0].ArtistName
	body += "<br />" + "Album name: " + objUser.Items.Album.AlbumName
	body += "<br />" + "Release date: " + objUser.Items.Album.ReleaseDate
	_ = utils.SendEmail(user.Email, "[Spotify] Details of your song "+objUser.Items.SongName, body)
}

/*
LOL:
Email me when league of legends PBE patch notes are posted

Weather:
Get the weather forecast every day at 7:00 AM
Get if it will rain tomorrow

Spotify:
Automatically create a Discover Weekly archive
When you like a video on YouTube, search for the song on Spotify
Add saved songs to a monthly playlist
Get a weekly email digest with the songs you liked on Spotify

Facebook:
notification d'anniversaire
*/
