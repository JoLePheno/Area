package main

import (
	"DEV_area_2018/server/action"
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/models"
	"gopkg.in/mgo.v2/bson"
	"time"
)

func LoopTriggers() {
	for {

		User := config.MongoSession.Model("User")
		Service := config.MongoSession.Model("Service")
		Area := config.MongoSession.Model("Area")

		var users []*models.User

		err := User.Find().Exec(&users)
		if err == nil {
			for _, user := range users {
				for _, serviceId := range user.Services.([]bson.ObjectId) {
					var service models.Service
					err := Service.FindId(serviceId).Exec(&service)
					if err == nil {
						for _, areaId := range service.Areas.([]bson.ObjectId) {
							var area models.Area
							_ = Area.FindId(areaId).Exec(&area)
							if err == nil {
								action.Actions[area.Name].(func(models.Area, models.User, models.Service))(area, *user, service)
							}
						}
					}
				}
			}
		}
		time.Sleep(60 * time.Second)
	}
}
