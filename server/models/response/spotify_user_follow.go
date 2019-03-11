package response

type SpotifyUserFollowBody struct {
	Artist SpotifyUserFollowArtists `json:"artists" binding:"required"`
}

type SpotifyUserFollowArtists struct {
	Items []SpotifyUserFollowItems `json:"items" binding:"required"`
}

type SpotifyUserFollowItems struct {
	Name string `json:"name" binding:"required"`
	Id   string `json:"id" binding:"required"`
}
