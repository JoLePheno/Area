package response

type ChampionRotationResponse struct {
	FreeChampionIds					[]int	`json:"freeChampionIds" binding:"required"`
	FreeChampionIdsForNewPlayers	[]int	`json:"freeChampionIdsForNewPlayers" binding:"required"`
	MaxNewPlayerLevel				int 	`json:"maxNewPlayerLevel" binding:"required"`
}