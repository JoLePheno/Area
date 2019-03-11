package response

type SteamSales struct {
	Items	[]SteamGame	`json:"items" binding:"required"`
}