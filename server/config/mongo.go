package config

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/zebresel-com/mongodm"
)

var MongoSession *mongodm.Connection

func init() {

	var localMap map[string]map[string]string

	myJsonFile := `{
	"en-US": {
			"validation.field_required": "Field '%s' is required.",
			"validation.field_invalid": "Field '%s' has an invalid value.",
			"validation.field_invalid_id": "Field '%s' contains an invalid object id value.",
			"validation.field_minlen": "Field '%s' must be at least %v characters long.",
			"validation.field_maxlen": "Field '%s' can be maximum %v characters long.",
			"validation.entry_exists": "%s already exists for value '%v'.",
			"validation.field_not_exclusive": "Only one of both fields can be set: '%s'' or '%s'.",
			"validation.field_required_exclusive": "Field '%s' or '%s' required."
		}
	}`

	json.Unmarshal([]byte(myJsonFile), &localMap)

	dbConfig := &mongodm.Config{
		DatabaseHosts: []string{"mongo"},
		DatabaseName:  "area",
		Locals:        localMap["en-US"],
	}

	var err error
	MongoSession, err = mongodm.Connect(dbConfig)

	if err != nil {
		fmt.Printf("Database connection error: %s\n", err.Error())
		os.Exit(1)
	} else {
		fmt.Println("Connected to mongo db")
	}
}
