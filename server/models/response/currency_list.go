package response

type CurrencyList struct {
	USD		CurrencyInfo	`json:"USD" binding:"required"`
	GBP		CurrencyInfo	`json:"GBP" binding:"required"`
	EUR		CurrencyInfo	`json:"EUR" binding:"required"`
}
