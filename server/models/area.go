package models

import (
	"github.com/zebresel-com/mongodm"
)

type Area struct {
	mongodm.DocumentBase `json:",inline" bson:",inline"`

	Name         string   				`json:"name" bson:"name" binding:"required"`
	Params 		 interface{}			`json:"params" bson:"params"`
	UserData     map[string]interface{}	`json:"user_data" bson:"user_data"`
}