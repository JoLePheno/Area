package controllers

import (
	"DEV_area_2018/server/config"
	"DEV_area_2018/server/middleware"
	"DEV_area_2018/server/models"
	"DEV_area_2018/server/models/payload"
	"DEV_area_2018/server/utils"
	"github.com/gin-gonic/gin"
	"gopkg.in/dgrijalva/jwt-go.v3"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"strings"
)

func InitUserController(route *gin.RouterGroup) {
	User := config.MongoSession.Model("User")
	Service := config.MongoSession.Model("Service")
	route.Use()
	{
		route.OPTIONS(":id", func (c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{})
		})

		route.OPTIONS("", func (c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{})
		})

		route.GET("", middleware.IsAdmin(), func(c *gin.Context) {

			var users []*models.User

			err := User.Find().Exec(&users)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			c.JSON(http.StatusOK, users)
		})

		route.GET("/:id", middleware.IsAdmin(), func(c *gin.Context) {
			var user models.User
			id := c.Param("id")

			err := User.FindId(bson.ObjectIdHex(id)).Exec(&user)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			c.JSON(http.StatusOK, user)
		})

		route.POST("", func(c *gin.Context) {
			var user models.User

			err := c.ShouldBind(&user)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			password, err := utils.HashPassword(user.Password)
			if HandleBasicError(err, c, http.StatusInternalServerError) {
				return
			} else {
				user.Password = password
			}
			_, _ = User.New(&user)

			if valid, issues := user.Validate(); !valid && issues[0].Error() == "Email already used" {
				if HandleBasicError(issues[0], c, http.StatusConflict) {
					return
				}
			} else if !valid {
				if HandleBasicError(issues[0], c, http.StatusBadRequest) {
					return
				}
			}

			err = user.Save()
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"id": user.Id.Hex(),
			})

			tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
			if HandleBasicError(err, c, http.StatusInternalServerError) {
				return
			}
			url := "http://localhost:3000/api/confirm-email/" + tokenString

			err = utils.SendConfirmationEmail(url, user.Email)
			if HandleBasicError(err, c, http.StatusInternalServerError) {
				return
			}

			c.JSON(http.StatusCreated, user)
		})

		route.POST("/login", func(c *gin.Context) {
			var user models.User

			email := strings.Replace(c.Query("email"), "%40", "@", 1)
			password := c.Query("password")

			if email == "" || password == "" {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Missing email or password",
				})
				return
			}

			err := User.FindOne(bson.M{"email": email}).Exec(&user)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			if !utils.ComparePassword(user.Password, password) {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Invalid email/password supplied",
				})
				return
			}

			if !user.Verified {
				c.JSON(http.StatusUnauthorized, gin.H{
					"error": "Email not confirmed",
				})
				return
			}

			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"id": user.Id.Hex(),
			})

			tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
			if HandleBasicError(err, c, http.StatusInternalServerError) {
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"token": tokenString,
				"user": user,
			})
		})

		route.POST("/google-authentication", func(c *gin.Context) {
			var user models.User
			var googleInfo payload.GoogleAuthenticationPayload
			var service models.Service

			err := c.ShouldBind(&googleInfo)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			service.Name = "Google"
			service.AccessToken = googleInfo.AccessToken
			service.UserId = googleInfo.Sub
			service.Areas = make([]bson.ObjectId, 0)
			err = User.FindOne(bson.M{"email": googleInfo.Email}).Exec(&user)
			if err != nil {
				_, _ = Service.New(&service)
				err = service.Save()
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				user.Verified = googleInfo.EmailVerified
				user.Email = googleInfo.Email
				user.Password = ""
				user.Services = make([]bson.ObjectId, 0)
				user.Services = append(user.Services.([]bson.ObjectId), service.Id)
				_, _ = User.New(&user)
				err = user.Save()
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				if googleInfo.EmailVerified == false {
					token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
						"id": user.Id.Hex(),
					})

					tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
					if HandleBasicError(err, c, http.StatusInternalServerError) {
						return
					}

					url := "http://localhost:3000/api/confirm-email/" + tokenString

					err = utils.SendConfirmationEmail(url, user.Email)
					if HandleBasicError(err, c, http.StatusInternalServerError) {
						return
					}
					c.JSON(http.StatusCreated, user)
					return
				}
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
					"id": user.Id.Hex(),
				})

				tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				c.JSON(http.StatusCreated, gin.H{
					"user": user,
					"token": tokenString,
				})
			} else {

				if user.Verified == false {
					token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
						"id": user.Id.Hex(),
					})

					tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
					if HandleBasicError(err, c, http.StatusInternalServerError) {
						return
					}

					url := "http://localhost:3000/api/confirm-email/" + tokenString

					err = utils.SendConfirmationEmail(url, user.Email)
					if HandleBasicError(err, c, http.StatusInternalServerError) {
						return
					}
					c.JSON(http.StatusUnauthorized, gin.H{
						"error": "Email not confirmed",
					})
					return
				}

				token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
					"id": user.Id.Hex(),
				})

				for _, serviceId := range user.Services.([]bson.ObjectId) {

					err = Service.FindId(serviceId).Exec(&service)
					if HandleBasicError(err, c, http.StatusInternalServerError) {
						return
					}

					if service.Name == "Google" &&
						service.UserId == googleInfo.Sub {
						tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
						if HandleBasicError(err, c, http.StatusInternalServerError) {
							return
						}

						c.JSON(http.StatusOK, gin.H{
							"token": tokenString,
							"user": user,
						})
						return
					}
				}

				_, _ = Service.New(&service)
				err = service.Save()
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				user.Services = append(user.Services.([]bson.ObjectId), service.Id)

				err = User.UpdateId(user.Id, user)
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				c.JSON(http.StatusOK, gin.H{
					"token": tokenString,
					"user": user,
				})
			}
		})

		route.POST("/facebook-authentication", func(c *gin.Context) {
			var user models.User
			var facebookInfo payload.FacebookAuthenticationPayload
			var service models.Service

			err := c.ShouldBind(&facebookInfo)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			service.Name = "Facebook"
			service.AccessToken = facebookInfo.AccessToken
			service.UserId = facebookInfo.Id
			service.Areas = make([]bson.ObjectId, 0)
			err = User.FindOne(bson.M{"email": facebookInfo.Email}).Exec(&user)
			if err != nil {
				_, _ = Service.New(&service)
				err = service.Save()
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				user.Verified = facebookInfo.EmailVerified
				user.Email = facebookInfo.Email
				user.Password = ""
				user.Services = make([]bson.ObjectId, 0)
				user.Services = append(user.Services.([]bson.ObjectId), service.Id)

				_, _ = User.New(&user)
				err = user.Save()
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				if facebookInfo.EmailVerified == false {
					token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
						"id": user.Id.Hex(),
					})

					tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
					if HandleBasicError(err, c, http.StatusInternalServerError) {
						return
					}

					url := "http://localhost:3000/api/confirm-email/" + tokenString

					err = utils.SendConfirmationEmail(url, user.Email)
					if HandleBasicError(err, c, http.StatusInternalServerError) {
						return
					}
					c.JSON(http.StatusCreated, user)
					return
				}
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
					"id": user.Id.Hex(),
				})

				tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				c.JSON(http.StatusOK, gin.H{
					"token": tokenString,
					"user": user,
				})
			} else {
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
					"id": user.Id.Hex(),
				})

				for _, serviceId := range user.Services.([]bson.ObjectId) {

					err = Service.FindId(serviceId).Exec(&service)
					if HandleBasicError(err, c, http.StatusInternalServerError) {
						return
					}

					if service.Name == "Facebook" &&
						service.UserId == facebookInfo.Id {
						tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
						if HandleBasicError(err, c, http.StatusInternalServerError) {
							return
						}

						c.JSON(http.StatusOK, gin.H{
							"token": tokenString,
							"user": user,
						})
						return
					}
				}

				_, _ = Service.New(&service)
				err = service.Save()
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				user.Services = append(user.Services.([]bson.ObjectId), service.Id)

				err = User.UpdateId(user.Id, user)
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				tokenString, err := token.SignedString([]byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"))
				if HandleBasicError(err, c, http.StatusInternalServerError) {
					return
				}

				c.JSON(http.StatusOK, gin.H{
					"token": tokenString,
					"user": user,
				})

			}
		})

		route.PUT("/:id", middleware.IsAdmin(), func(c *gin.Context) {
			var user models.User
			id := c.Param("id")

			err := c.ShouldBind(&user)
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			password, err := utils.HashPassword(user.Password)
			if HandleBasicError(err, c, http.StatusInternalServerError) {
				return
			} else {
				user.Password = password
			}

			err = User.UpdateId(bson.ObjectIdHex(id), user)

			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}
			user.Id = bson.ObjectIdHex(id)
			c.JSON(http.StatusOK, user)
		})

		route.DELETE("/:id", middleware.IsAdmin(), func(c *gin.Context) {
			id := c.Param("id")

			err := User.RemoveId(bson.ObjectIdHex(id))
			if HandleBasicError(err, c, http.StatusBadRequest) {
				return
			}

			c.Status(http.StatusNoContent)
		})

	}

}
