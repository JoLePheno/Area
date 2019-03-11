package controllers

import (
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/payload"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

func InitAreaController(route *gin.RouterGroup) {
	Area := config.MongoSession.Model("Area")
	Service := config.MongoSession.Model("Service")

	route.Use()
	{

		route.GET("", func(c *gin.Context) {
			var areas []models.Area
			services := c.Keys["user"].(models.User).Services
			for _, serviceId := range services.([]bson.ObjectId) {
				var service models.Service

				err := Service.FindId(serviceId).Exec(&service)
				if err != nil {
					c.JSON(http.StatusOK, areas)
				}

				for _, areaId := range service.Areas.([]bson.ObjectId) {
					var area models.Area
					err = Area.FindId(areaId).Exec(&area)
					if err == nil {
						areas = append(areas, area)
					}
				}
			}
			c.JSON(http.StatusOK, areas)
		})

		route.GET("/:id", func(c *gin.Context) {
			var area models.Area
			id := c.Param("id")
			err := Area.FindId(bson.ObjectIdHex(id)).Exec(&area)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			c.JSON(http.StatusOK, area)
		})

		route.POST("", func(c *gin.Context) {
			var areaPayload payload.AreaPayload
			err := c.ShouldBind(&areaPayload)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			area := areaPayload.Area

			if HandleBasicError(err, c, http.StatusInternalServerError) {
				return
			}

			for _, serviceId := range c.Keys["user"].(models.User).Services.([]bson.ObjectId) {
				var service models.Service
				err = Service.FindId(serviceId).Exec(&service)
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				if service.Name == areaPayload.ServiceName {
					_, _ = Area.New(&area)

					err = area.Save()
					service.Areas = append(service.Areas.([]bson.ObjectId), area.Id)
					err = Service.UpdateId(service.Id, service)
					if HandleBasicError(err, c, http.StatusBadRequest) {
						return
					}

					c.JSON(http.StatusCreated, area)
					return
				}
			}
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "This service doesn't exist or isn't link with on this account",
			})
		})

		route.PUT("/:id", func (c *gin.Context) {
			var area models.Area
			id := c.Param("id")

			err := c.ShouldBind(&area)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			err = Area.UpdateId(bson.ObjectIdHex(id), &area)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			area.Id = bson.ObjectIdHex(id)
			c.JSON(http.StatusOK, area)
		})

		route.DELETE("/:id", func (c *gin.Context) {
			id := c.Param("id")

			err := Area.RemoveId(bson.ObjectIdHex(id))
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			user := c.Keys["user"].(models.User)
			var service models.Service
			for _, serviceId := range user.Services.([]bson.ObjectId) {
				err := Service.FindId(serviceId).Exec(&service)
				if HandleBasicError(err, c, http.StatusBadRequest) {
					return
				}

				for i, area := range service.Areas.([]bson.ObjectId) {
					if area.Hex() == id {
						service.Areas = append(service.Areas.([]bson.ObjectId)[:i], service.Areas.([]bson.ObjectId)[i+1:]...)
					}
				}
			}
			err = Service.UpdateId(service.Id, service)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			c.Status(http.StatusNoContent)
		})
	}
}