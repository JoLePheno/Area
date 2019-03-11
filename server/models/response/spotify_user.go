package response

type SpotifyUser struct {
	UserId string `json:"id" binding:"required"`
}

type SpotifyUserCurrent struct {
	Items SpotifyUserItems `json:"item" binding:"required"`
}

type SpotifyUserItems struct {
	SongName string          `json:"name" binding:"required"`
	Artist   []SpotifyArtist `json:"artists" binding:"required"`
	Album    SpotifyAlbum    `json:"album" binding:"required"`
}

type SpotifyArtist struct {
	ArtistName string `json:"name" binding:"required"`
}

type SpotifyAlbum struct {
	AlbumName   string `json:"name" binding:"required"`
	ReleaseDate string `json:"release_date" binding:"required"`
}
