package models

type ActionList struct {
	Name         string   	`json:"name" bson:"name"`
	Description  string   	`json:"description" bson:"description"`
	Input		 bool   	`json:"input" bson:"input"`
	Image		 string	  	`json:"image" bson:"image"`
}