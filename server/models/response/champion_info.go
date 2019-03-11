package response

type ChampionInfo struct {
	Key		string			`json:"key" binding:"required"`
	Name	string			`json:"name" binding:"required"`
	Title	string			`json:"title" binding:"required"`
	Blurb	string			`json:"blurb" binding:"required"`
	Tags	[]string		`json:"tags" binding:"required"`
	Stats   ChampionStats	`json:"stats" binding:"required"`
}
