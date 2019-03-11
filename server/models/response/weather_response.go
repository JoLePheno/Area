package response

type WeatherResponse struct {
	List	[]WeatherList	`json:"list" binding:"required"`
}
