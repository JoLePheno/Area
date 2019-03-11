package response

type Weather struct {
	Temp		float64		`json:"temp" binding:"required"`
	Humidity	int		`json:"humidity" binding:"required"`
}