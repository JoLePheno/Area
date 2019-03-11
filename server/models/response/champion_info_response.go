package response

type ChampionInfoResponse struct {
	Data	[]ChampionInfo	`json:"data" binding:"required"`
}
