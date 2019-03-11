package response

type RedditThreadData struct {
	Children	[]RedditThreadInfo	`json:"children"`
}