package response

type SunResponse struct {
	Results	SunResult  `json:"results" binding:"required"`
}