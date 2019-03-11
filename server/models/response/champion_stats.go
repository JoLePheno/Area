package response

type ChampionStats struct {
	Hp							float64	`json:"hp"`
	HpPerLevel					float64	`json:"hpperlevel"`
	Mp							float64	`json:"mp"`
	MpPerLevel					float64	`json:"mpperlevel"`
	MoveSpeed					float64	`json:"movespeed"`
	Armor						float64	`json:"armor"`
	ArmorPerLevel				float64	`json:"armorperlevel"`
	SpellBlock					float64	`json:"spellblock"`
	SpellBlockPerLevel			float64	`json:"spellblockperlevel"`
	AttackRange					float64	`json:"attackrange"`
	HpRegen						float64	`json:"hpregen"`
	HpRegenPerLevel				float64	`json:"hpregenperlevel"`
	MpRegen						float64	`json:"mpregen"`
	MpRegenPerLevel				float64	`json:"mpregenperlevel"`
	Crit						float64	`json:"crit"`
	CritPerLevel				float64	`json:"critperlevel"`
	AttackDamage				float64	`json:"attackdamage"`
	AttackDamagePerLevel		float64	`json:"attackdamageperlevel"`
	AttackSpeedOffset			float64	`json:"attackspeedoffset"`
	AttackSpeedOffsetPerLevel	float64	`json:"attackspeedperlevel"`
}
