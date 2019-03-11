package models

import "github.com/zebresel-com/mongodm"

type ServiceList struct {
	mongodm.DocumentBase `json:",inline" bson:",inline"`

	Name         string   		 	`json:"name" bson:"name"`
	Auth		 bool   	 	 	`json:"auth" bson:"auth"`
	Image		 string	  	 	 	`json:"image" bson:"image"`
	Actions		 []ActionList		`json:"actions" bson:"actions"`
	Reactions	 []ReactionList		`json:"reactions" bson:"reactions"`
}