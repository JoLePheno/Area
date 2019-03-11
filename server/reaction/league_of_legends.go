package reaction

import (
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/response"
	"DEV_area_2018/server/utils"
	"encoding/json"
	"github.com/parnurzeal/gorequest"
	"regexp"
	"strconv"
)

var ChampionsInfo []response.ChampionInfo

func ChampionsRotation(rotation response.ChampionRotationResponse, user models.User) {
	ChampionsInfo = FindChampionInfo()

	body :=  "Free champion for player under level " + strconv.Itoa(rotation.MaxNewPlayerLevel)
	for _, id := range rotation.FreeChampionIdsForNewPlayers {
		for _, champ := range ChampionsInfo {
			if champ.Key == strconv.Itoa(id) {
				body += "<br /> " + champ.Name
			}
		}
	}
	body += "<br /><br />  Free champion for player beyond level " + strconv.Itoa(rotation.MaxNewPlayerLevel)
	for _, id := range rotation.FreeChampionIds {
		for _, champ := range ChampionsInfo {
			if champ.Key == strconv.Itoa(id) {
				body += "<br /> " + champ.Name
			}
		}
	}
	_ = utils.SendEmail(user.Email, "League of legends free champion rotation", body)
}

func NewChampion(newChamps []response.ChampionInfo, user models.User) {
	body := "New champion(s):<br />"
	for _, champion := range newChamps {
		body += champion.Name + "<br />"
		body += champion.Title + "<br />"
		body += champion.Blurb + "<br />"
		for _, tag := range champion.Tags {
			body += tag + " "
		}
		body += "<br /><br />Stats:<br />"
		body += "Hp: " + strconv.FormatFloat(champion.Stats.Hp, 'f', -1, 64) +  "<br />"
		body += "Hp per level: " + strconv.FormatFloat(champion.Stats.HpPerLevel, 'f', -1, 64) +  "<br />"
		body += "Mana: " + strconv.FormatFloat(champion.Stats.Mp, 'f', -1, 64) +  "<br />"
		body += "Mana per level: " + strconv.FormatFloat(champion.Stats.MpPerLevel, 'f', -1, 64) +  "<br />"
		body += "Move speed: " + strconv.FormatFloat(champion.Stats.MoveSpeed, 'f', -1, 64) +  "<br />"
		body += "Armor: " + strconv.FormatFloat(champion.Stats.Armor, 'f', -1, 64) +  "<br />"
		body += "Armor per level: " + strconv.FormatFloat(champion.Stats.ArmorPerLevel, 'f', -1, 64) +  "<br />"
		body += "Spell block: " + strconv.FormatFloat(champion.Stats.SpellBlock, 'f', -1, 64) +  "<br />"
		body += "Spell block per level: " + strconv.FormatFloat(champion.Stats.SpellBlockPerLevel, 'f', -1, 64) +  "<br />"
		body += "Attack range: " + strconv.FormatFloat(champion.Stats.AttackRange, 'f', -1, 64) +  "<br />"
		body += "Hp regen: " + strconv.FormatFloat(champion.Stats.HpRegen, 'f', -1, 64) +  "<br />"
		body += "Hp regen per level: " + strconv.FormatFloat(champion.Stats.HpRegenPerLevel, 'f', -1, 64) +  "<br />"
		body += "Mp regen: " + strconv.FormatFloat(champion.Stats.MpRegen, 'f', -1, 64) +  "<br />"
		body += "Mp regen per level: " + strconv.FormatFloat(champion.Stats.MpRegenPerLevel, 'f', -1, 64) +  "<br />"
		body += "Crit: " + strconv.FormatFloat(champion.Stats.Crit, 'f', -1, 64) +  "<br />"
		body += "Crit per level: " + strconv.FormatFloat(champion.Stats.CritPerLevel, 'f', -1, 64) +  "<br />"
		body += "Attack damage: " + strconv.FormatFloat(champion.Stats.AttackDamage, 'f', -1, 64) +  "<br />"
		body += "Attack damage per level: " + strconv.FormatFloat(champion.Stats.AttackDamagePerLevel, 'f', -1, 64) +  "<br />"
		body += "Attack speed offset: " + strconv.FormatFloat(champion.Stats.AttackSpeedOffset, 'f', -1, 64) +  "<br />"
		body += "Attack speed offset per level: " + strconv.FormatFloat(champion.Stats.AttackSpeedOffsetPerLevel, 'f', -1, 64) +  "<br />"

		body += "<br />"
	}
	_ = utils.SendEmail(user.Email, "League of legends new champion(s)", body)
}

func FindChampionInfo() []response.ChampionInfo {
	_, body, err := gorequest.New().Get("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json").End()
	if err != nil {
		return nil
	}

	var re = regexp.MustCompile(`("data":)({)`)
	body = re.ReplaceAllString(body, `$1[`)
	re = regexp.MustCompile(`(}})(})(})`)
	body = re.ReplaceAllString(body, `$1]$2`)
	re = regexp.MustCompile(`(}}),".+?":({"version")`)
	body = re.ReplaceAllString(body, `$1,$2`)
	re = regexp.MustCompile(`"Aatrox":`)
	body = re.ReplaceAllString(body, ``)

	var championInfo response.ChampionInfoResponse
	if err := json.Unmarshal([]byte(body), &championInfo); err != nil {
	}
	return championInfo.Data
}