package response

type SteamGame struct {
	Name				string	`json:"name" binding:"required"`
	Discounted			bool	`json:"discounted" binding:"required"`
	DiscountPercent		int		`json:"discount_percent" binding:"required"`
	Currency			string 	`json:"currency" binding:"required"`
	OriginalPrice		int 	`json:"original_price" binding:"required"`
	FinalPrice			int 	`json:"final_price" binding:"required"`
	DiscountExpiration	int64		`json:"discount_expiration" binding:"required"`
}