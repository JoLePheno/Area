package payload

import "DEV_area_2018/server/models"

type AreaPayload struct {
	ServiceName	string		`json:"service_name" binding:"required"`
	Area		models.Area `json:"area" binding:"required"`
}

