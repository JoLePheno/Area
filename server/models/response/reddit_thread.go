package response

type RedditThread struct {
	Title		string	`json:"title"`
	Url			string	`json:"url"`
	Permalink	string  `json:"permalink"`
}
