package main

import (
	"DEV_area_2018/server/action"
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/controllers"
	"DEV_area_2018/server/models"
)

func main() {
	defer config.MongoSession.Close()
	models.RegisterModels()
	models.RegisterServices()
	r := controllers.InitRouter()
	action.RegisterActions()
	go LoopTriggers()
	_ = r.Run(":3000")
}