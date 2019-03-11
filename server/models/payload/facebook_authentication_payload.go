package payload

type FacebookAuthenticationPayload struct {
	Email			string	 `json:"email" binding:"required"`
	EmailVerified	bool	 `json:"email_verified" binding:"required"`
	Id				string	 `json:"id" binding:"required"`
	AccessToken		string	 `json:"facebook_token" binding:"required"`
}