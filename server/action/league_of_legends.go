package action

import (
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/reaction"
	"encoding/json"
	"github.com/mitchellh/mapstructure"
	"github.com/parnurzeal/gorequest"
)

var apiKey = "RGAPI-aec42714-149e-4e7e-be25-4927ab968936"

func ChampionsRotation(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")
	_, body, err := gorequest.New().Get("https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" + apiKey).End()
	if err != nil {
		return
	}

	var rotation response.ChampionRotationResponse
	if err := json.Unmarshal([]byte(body), &rotation); err != nil {
	}

	var userChampRotation response.ChampionRotationResponse
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &userChampRotation)
	}

	hasChanged := false

	if rotation.MaxNewPlayerLevel != userChampRotation.MaxNewPlayerLevel ||
		len(rotation.FreeChampionIdsForNewPlayers) != len(userChampRotation.FreeChampionIdsForNewPlayers) ||
		len(rotation.FreeChampionIds) != len(userChampRotation.FreeChampionIds) {
		area.UserData[user.Id.Hex()] = rotation
		_ = Area.UpdateId(area.Id, &area)
		reaction.ChampionsRotation(rotation, user)
		return
	}
	for i, id := range rotation.FreeChampionIds {
		if id != userChampRotation.FreeChampionIds[i] {
			hasChanged = true
		}
	}
	for i, id := range rotation.FreeChampionIdsForNewPlayers {
		if id != userChampRotation.FreeChampionIdsForNewPlayers[i] {
			hasChanged = true
		}
	}

	if hasChanged == false {
		return
	}

	area.UserData[user.Id.Hex()] = rotation
	_ = Area.UpdateId(area.Id, &area)
	reaction.ChampionsRotation(rotation, user)
}

func NewChampion(area models.Area, user models.User, service models.Service) {
	Area := config.MongoSession.Model("Area")
	reaction.ChampionsInfo = reaction.FindChampionInfo()
	var userChampion []response.ChampionInfo
	if area.UserData == nil {
		area.UserData = make(map[string]interface{})
	} else {
		_ = mapstructure.Decode(area.UserData[user.Id.Hex()], &userChampion)
	}

	if len(userChampion) == len(reaction.ChampionsInfo) {
		return
	}

	var champs []response.ChampionInfo
	for _, champion := range reaction.ChampionsInfo {
		match := false
		for _, check := range userChampion {
			if check.Name == champion.Name {
				match = true
			}
		}
		if match == false {
			champs = append(champs, champion)
			userChampion = append(userChampion, champion)
		}
	}
	area.UserData[user.Id.Hex()] = userChampion
	_ = Area.UpdateId(area.Id, &area)
	reaction.NewChampion(champs, user)
}

