package payload

type GoogleAuthenticationPayload struct {
	Aud				string   `json:"aud"`
	Iss				string   `json:"iss"`
	Name			string	 `json:"name"`
	FamilyName		string	 `json:"family_name"`
	GivenName		string	 `json:"given_name"`
	Picture			string	 `json:"picture"`
	Email			string	 `json:"email" binding:"required"`
	EmailVerified	bool	 `json:"email_verified"`
	AtHash			string	 `json:"at_hash"`
	Exp				int	 	 `json:"exp"`
	Azp				string	 `json:"azp"`
	Iat				int	 	 `json:"iat"`
	Locale			string	 `json:"local"`
	Sub				string	 `json:"sub" binding:"required"`
	AccessToken		string	 `json:"google_token" binding:"required"`
}