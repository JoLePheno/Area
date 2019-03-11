package response

type CurrencyInfo struct {
	Code			string	`json:"code" binding:"required"`
	Rate			string	`json:"rate" binding:"required"`
	Description		string	`json:"description" binding:"required"`
}