package controllers

import (
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/models"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
	"net/http"
)

func InitServiceController(route *gin.RouterGroup) {
	Service := config.MongoSession.Model("Service")

	route.Use()
	{

		route.GET("", func(c *gin.Context) {
			var servicesObj []models.Service
			services := c.Keys["user"].(models.User).Services
			for _, serviceId := range services.([]bson.ObjectId) {
				var service models.Service

				err := Service.FindId(serviceId).Exec(&service)
				if err == nil {
					servicesObj = append(servicesObj, service)
				}
			}
			c.JSON(http.StatusOK, servicesObj)
		})

		route.GET("/:id", func(c *gin.Context) {
			var service models.Service
			id := c.Param("id")
			err := Service.FindId(bson.ObjectIdHex(id)).Exec(&service)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			c.JSON(http.StatusOK, service)
		})

		route.POST("", func(c *gin.Context) {
			var service models.Service
			err := c.ShouldBind(&service)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			_, _ = Service.New(&service)

			err = service.Save()
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			var user models.User
			user = c.Keys["user"].(models.User)
			if user.Services == nil {
				user.Services = make([]bson.ObjectId, 1)
				user.Services.([]bson.ObjectId)[0] = service.Id
			} else {
				user.Services = append(user.Services.([]bson.ObjectId), service.Id)
			}

			User := config.MongoSession.Model("User")

			err = User.UpdateId(user.Id, user)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			c.JSON(http.StatusCreated, service)
		})

		route.PUT("/:id", func (c *gin.Context) {
			var service models.Service
			id := c.Param("id")

			err := c.ShouldBind(&service)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			err = Service.UpdateId(bson.ObjectIdHex(id), &service)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			service.Id = bson.ObjectIdHex(id)
			c.JSON(http.StatusOK, service)
		})

		route.DELETE("/:id", func (c *gin.Context) {
			id := c.Param("id")

			err := Service.RemoveId(bson.ObjectIdHex(id))
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			user := c.Keys["user"].(models.User)
			for i, service := range user.Services.([]bson.ObjectId) {
				if service.Hex() == id {
					user.Services = append(user.Services.([]bson.ObjectId)[:i], user.Services.([]bson.ObjectId)[i+1:]...)
				}
			}
			User := config.MongoSession.Model("User")
			err = User.UpdateId(user.Id, user)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			c.Status(http.StatusNoContent)
		})
	}
}