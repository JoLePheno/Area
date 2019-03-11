package controllers

import (
	"github.com/gin-gonic/gin"
)

func HandleBasicError(err error, c *gin.Context, code int) bool {
	if err != nil {
		c.JSON(code, gin.H{
			"error": err.Error(),
		})
		return true
	}
	return false
}