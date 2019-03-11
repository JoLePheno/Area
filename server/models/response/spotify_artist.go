package response

type SpotifyArtistTracks struct {
	Tracks []SpotifyArtistTracksName `json:"tracks" binding:"required"`
}

type SpotifyArtistTracksName struct {
	Name string `json:"name" binding:"required"`
	Uri  string `json:"uri" binding:"required"`
}
