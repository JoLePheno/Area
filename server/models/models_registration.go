package models

import (
	"DEV_area_2018/server/config"
)

func RegisterModels() {
	config.MongoSession.Register(&User{}, "users")
	config.MongoSession.Register(&Service{}, "services")
	config.MongoSession.Register(&Area{}, "areas")
	config.MongoSession.Register(&ServiceList{}, "service_list")
}

func RegisterServices() {
	serviceList := config.MongoSession.Model("ServiceList")

	nb, _ := serviceList.Find().Count()
	if nb > 0 {
		return
	}

	var service ServiceList
	var action ActionList

	service.Name = "LeagueOfLegends"

	action.Name = "ChampionsRotation"
	action.Description = "Triggered when a new champion rotation is set"
	service.Actions = append(service.Actions, action)

	action.Name = "NewChampion"
	action.Description = "Triggered when a new champion is released"
	service.Actions = append(service.Actions, action)

	var reaction ReactionList
	reaction.Name = "ChampionsRotation"
	reaction.Description = "Notify the user when a new champion rotation is set"
	service.Reactions = append(service.Reactions, reaction)

	reaction.Name = "NewChampion"
	reaction.Description = "Notify the user when a new champion is released"
	service.Reactions = append(service.Reactions, reaction)

	_, _ = serviceList.New(&service)

	_ = service.Save()

	service = ServiceList{}

	service.Name = "Steam"

	action.Name = "SteamSales"
	action.Description = "Triggered when a steam games have a new price"
	service.Actions = append(service.Actions, action)

	reaction.Name = "SteamSales"
	reaction.Description = "Notify when a steam games have a new price"
	service.Reactions = append(service.Reactions, reaction)

	_, _ = serviceList.New(&service)

	_ = service.Save()

	service = ServiceList{}

	service.Name = "Reddit"

	action.Name = "FreeGamesOnSteam"
	action.Description = "Triggered when a steam game is free"
	service.Actions = append(service.Actions, action)

	reaction.Name = "FreeGamesOnSteam"
	reaction.Description = "Notify when a steam game is free"
	service.Reactions = append(service.Reactions, reaction)

	action.Name = "FollowSubReddit"
	action.Description = "Triggered when a new subject is open on a specific subreddit"
	service.Actions = append(service.Actions, action)

	reaction.Name = "FollowSubReddit"
	reaction.Description = "Notify when a new subject is open on a specific subreddit"
	service.Reactions = append(service.Reactions, reaction)

	_, _ = serviceList.New(&service)

	_ = service.Save()

	service = ServiceList{}

	service.Name = "Finance"

	action.Name = "Bpi"
	action.Description = "Triggered when bitcoins price change"
	service.Actions = append(service.Actions, action)

	reaction.Name = "Bpi"
	reaction.Description = "Notify when bitcoins price change"
	service.Reactions = append(service.Reactions, reaction)

	_, _ = serviceList.New(&service)

	_ = service.Save()

	service = ServiceList{}

	service.Name = "Weather"

	action.Name = "Sunset"
	action.Description = "Triggered when need to send sunrise"
	service.Actions = append(service.Actions, action)

	action.Name = "Sunrise"
	action.Description = "Triggered when need to send sunrise"
	service.Actions = append(service.Actions, action)

	reaction.Name = "Sunset"
	reaction.Description = "Notify today sunset"
	service.Reactions = append(service.Reactions, reaction)

	reaction.Name = "Sunrise"
	reaction.Description = "Notify tomorrow sunrise"
	service.Reactions = append(service.Reactions, reaction)

	action.Name = "Weather"
	action.Description = "Triggered each day"
	service.Actions = append(service.Actions, action)

	reaction.Name = "Weather"
	reaction.Description = "Notify today weather"
	service.Reactions = append(service.Reactions, reaction)

	_, _ = serviceList.New(&service)

	_ = service.Save()

	service = ServiceList{}

	service.Name = "Spotify"

	action.Name = "SpotifyArtistFollow"
	action.Description = "Trigger when follow new artist"
	service.Actions = append(service.Actions, action)

	reaction.Name = "CreatePlaylistNewFollow"
	reaction.Description = "Create playlist and add 5 top tracks of the artist you just followed"
	service.Reactions = append(service.Reactions, reaction)

	action.Name = "UserTopTrackDay"
	action.Description = "Get your top song of the day"
	service.Actions = append(service.Actions, action)

	reaction.Name = "SpotifySendDailyEmail"
	reaction.Description = "Create playlist and add 5 top tracks of the artist you just followed"
	service.Reactions = append(service.Reactions, reaction)

	action.Name = "UserTopTrackDay"
	action.Description = "Get your top song of the day"
	service.Actions = append(service.Actions, action)

	reaction.Name = "SpotifySendDailyEmail"
	reaction.Description = "Create playlist and add 5 top tracks of the artist you just followed"
	service.Reactions = append(service.Reactions, reaction)

	_, _ = serviceList.New(&service)

	_ = service.Save()
}
