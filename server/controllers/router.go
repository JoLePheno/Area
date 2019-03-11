package controllers

import (
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/middleware"
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/utils"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"time"
)

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers, authorization, content-type")
		c.Header("Content-Type", "application/json")
	}
}

func InitRouter() *gin.Engine {
	r := gin.New()

	r.Use(CORS())

	r.Use(gin.Logger())

	r.Use(gin.Recovery())

	api := r.Group("/api")

	api.OPTIONS("/areas/:id", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{})
	})

	api.OPTIONS("/areas", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{})
	})

	api.OPTIONS("/services/:id", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{})
	})

	api.OPTIONS("/services", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{})
	})

	user := api.Group("/users")

	api.GET("/confirm-email/:token", func(c *gin.Context) {
		token := c.Param("token")
		var user models.User

		claims, valid, err := utils.DecryptToken(token)

		if !valid {
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}
		}

		id := claims["id"]
		User := config.MongoSession.Model("User")

		err = User.FindId(bson.ObjectIdHex(id.(string))).Exec(&user)
		if HandleBasicError(err, c, http.StatusBadRequest) {
			return
		}

		user.Verified = true

		err = User.UpdateId(user.Id, user)
		if HandleBasicError(err, c, http.StatusBadRequest) {
			return
		}

		c.Redirect(http.StatusPermanentRedirect, "https://localhost:8000/#/login")
	})

	r.GET("about.json", func(c *gin.Context) {
		host := c.ClientIP()
		var serviceList []*models.ServiceList

		ServiceList := config.MongoSession.Model("ServiceList")

		err := ServiceList.Find().Exec(&serviceList)
		if HandleBasicError(err, c, http.StatusBadRequest) {
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"client": gin.H{
				"host": host,
			},
			"server": gin.H{
				"current_time": time.Now().Format("20060102150405"),
			},
			"services": serviceList,
		})
	})

	InitUserController(user)

	service := api.Group("/services")

	service.Use(middleware.IsAuthenticated())

	InitServiceController(service)

	area := api.Group("/areas")

	area.Use(middleware.IsAuthenticated())

	InitAreaController(area)

	return r
}
