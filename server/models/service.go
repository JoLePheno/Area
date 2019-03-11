package models

import (
	"github.com/zebresel-com/mongodm"
)

type Service struct {
	mongodm.DocumentBase `json:",inline" bson:",inline"`

	Name         string   	  `json:"name" bson:"name" binding:"required"`
	UserId		 string   	  `json:"user_id" bson:"user_id"`
	AccessToken	 string	  	  `json:"access_token" bson:"access_token"`
	Areas		 interface{}  `json:"areas" bson:"areas" model:"Area" relation:"1n" autosave:"true"`
}