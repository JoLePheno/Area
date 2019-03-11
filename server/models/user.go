package models

import (
	"DEV_area_2018/server/config"
	"github.com/zebresel-com/mongodm"
	"gopkg.in/mgo.v2/bson"
)

type User struct {
	mongodm.DocumentBase `json:",inline" bson:",inline"`

	Email        string   		`json:"email" bson:"email" validation:"email" binding:"required"`
	Password	 string   		`json:"password" bson:"password" binding:"required"`
	Admin		 bool	  		`json:"admin" bson:"admin"`
	Verified	 bool	  		`json:"verified" bson:"verified"`
	Services	 interface{}	`json:"services" bson:"services" model:"Service" relation:"1n" autosave:"true"`
}

func (self *User) Validate(values ...interface{}) (bool, []error) {

	var validationErrors []error
	var valid bool

	valid, validationErrors = self.DefaultValidate()

	User := config.MongoSession.Model("User")
	nb, err := User.FindOne(bson.M{"email": self.Email}).Count()


	if nb > 0  || err != nil {
		valid = false
		if err != nil {
			self.AppendError(&validationErrors, err.Error())
		} else {
			self.AppendError(&validationErrors, "Email already used")
		}
	}

	if len(validationErrors) > 0 {
		valid = false
	}

	return valid, validationErrors
}