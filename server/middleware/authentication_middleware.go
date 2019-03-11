package middleware

import (
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/utils"
	"github.com/gin-gonic/gin"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"strings"
)

/*type login struct {
	Username string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

var identityKey = "id"

func helloHandler(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	user, _ := c.Get(identityKey)
	c.JSON(200, gin.H{
		"userID":   claims["id"],
		"userName": user.(*User).UserName,
		"text":     "Hello World.",
	})
}

// User demo
type User struct {
	UserName  string
	FirstName string
	LastName  string
}

/*func main() {
	port := os.Getenv("PORT")
	r := gin.New()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	if port == "" {
		port = "8000"
	}

	// the jwt middleware
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "test zone",
		Key:         []byte("secret key"),
		Timeout:     time.Hour,
		MaxRefresh:  time.Hour,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*User); ok {
				return jwt.MapClaims{
					identityKey: v.UserName,
				}
			}
			return jwt.MapClaims{}
		},
		Authenticator: func(c *gin.Context) (interface{}, error) {
			var loginVals login
			if err := c.ShouldBind(&loginVals); err != nil {
				return "", jwt.ErrMissingLoginValues
			}
			userID := loginVals.Username
			password := loginVals.Password

			if (userID == "admin" && password == "admin") || (userID == "test" && password == "test") {
				return &User{
					UserName:  userID,
					LastName:  "Bo-Yi",
					FirstName: "Wu",
				}, nil
			}

			return nil, jwt.ErrFailedAuthentication
		},
		Authorizator: func(data interface{}, c *gin.Context) bool {
			if v, ok := data.(*User); ok && v.UserName == "admin" {
				return true
			}

			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		// TokenLookup is a string in the form of "<source>:<name>" that is used
		// to extract token from the request.
		// Optional. Default value "header:Authorization".
		// Possible values:
		// - "header:<name>"
		// - "query:<name>"
		// - "cookie:<name>"
		// - "param:<name>"
		TokenLookup: "header: Authorization, query: token, cookie: jwt",
		// TokenLookup: "query:token",
		// TokenLookup: "cookie:token",

		// TokenHeadName is a string in the header. Default value is "Bearer"
		TokenHeadName: "Bearer",

		// TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
		TimeFunc: time.Now,
	})

	if err != nil {
		log.Fatal("JWT Error:" + err.)
	}

	r.POST("/login", authMiddleware.LoginHandler)

	r.NoRoute(authMiddleware.MiddlewareFunc(), func(c *gin.Context) {
		claims := jwt.ExtractClaims(c)
		log.Printf("NoRoute claims: %#v\n", claims)
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	auth := r.Group("/auth")
	// Refresh time can be longer than token timeout
	auth.GET("/refresh_token", authMiddleware.RefreshHandler)
	auth.Use(authMiddleware.MiddlewareFunc())
	{
		auth.GET("/hello", helloHandler)
	}

	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatal(err)
	}
}*/

func IsAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {

		header := c.GetHeader("Authorization")
		if header == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Admin reserved action",
			})
			c.Abort()
			return
		}
		claims, valid, err := utils.DecryptToken(strings.Replace(header, "Bearer ", "", 1))
		if !valid {
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "Admin reserved action",
				})
			}
			c.Abort()
			return
		}

		var user models.User
		User := config.MongoSession.Model("User")

		id := claims["id"].(string)

		err = User.FindId(bson.ObjectIdHex(id)).Exec(&user)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Admin reserved action",
			})
			c.Abort()
			return
		}

		if user.Admin == false {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Admin reserved action",
			})
			c.Abort()
		}
		c.Set("user", user)
		c.Next()
	}
}

func IsAuthenticated() gin.HandlerFunc {
	return func(c *gin.Context) {

		header := c.GetHeader("Authorization")
		if header == "" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Not authorized",
			})
			c.Abort()
			return
		}

		claims, valid, err := utils.DecryptToken(strings.Replace(header, "Bearer ", "", 1))
		if !valid {
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "Not authorized",
				})
			}
			c.Abort()
			return
		}

		var user models.User
		User := config.MongoSession.Model("User")

		id := claims["id"].(string)

		err = User.FindId(bson.ObjectIdHex(id)).Exec(&user)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Not authorized",
			})
			c.Abort()
			return
		}

		if user.Verified == false {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Not authorized",
			})
			c.Abort()
			return
		}
		c.Set("user", user)
		c.Next()
	}
}