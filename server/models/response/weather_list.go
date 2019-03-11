package response

type WeatherList struct {
	Main	Weather			`json:"main" binding:"required"`
	Weather	[]WeatherDesc	`json:"weather" binding:"required"`
}