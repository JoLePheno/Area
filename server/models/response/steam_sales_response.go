package response

type SteamSalesResponse struct {
	Specials	SteamSales	`json:"specials" binding:"required"`
}