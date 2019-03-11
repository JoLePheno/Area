package response

type SpotifyPlaylistCreate struct {
	PlaylistId string `json:"id" binding:"required"`
}
