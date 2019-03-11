package action

var Actions map[string]interface{}

func RegisterActions() {
	actions := map[string]interface{}{
		"ChampionsRotation":   ChampionsRotation,
		"NewChampion":         NewChampion,
		"SteamSales":          SteamSales,
		"FreeGamesOnSteam":    FreeGamesOnSteam,
		"FollowSubReddit":     FollowSubReddit,
		"SpotifyArtistFollow": SpotifyArtistFollow,
		"UserTopTrackDay":     UserTopTrackDay,
		"CurrentTrackInfo":    CurrentTrackInfo,
		"Bpi":                 Bpi,
		"Sunset":              Sunset,
		"Weather":             Weather,
		"Sunrise":             Sunrise,
	}
	Actions = actions
}
