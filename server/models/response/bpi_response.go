package response

type BpiResponse struct {
	Time	BpiTime			`json:"time" binding:"required"`
	Bpi		CurrencyList	`json:"bpi" binding:"required"`
}
