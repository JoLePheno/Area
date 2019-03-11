package response

type WeatherDesc struct {
	Description	string		`json:"description" binding:"required"`
}