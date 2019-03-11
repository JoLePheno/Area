package response

type SunResult struct {
	Sunrise		string  `json:"sunrise" binding:"required"`
	Sunset		string  `json:"sunset" binding:"required"`
	SolarMoon	string  `json:"solar_moon" binding:"required"`
	DayLength	string  `json:"day_length" binding:"required"`
}