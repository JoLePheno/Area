package models

type ReactionList struct {
	Name         string   	`json:"name" bson:"name"`
	Description  string   	`json:"description" bson:"description"`
}