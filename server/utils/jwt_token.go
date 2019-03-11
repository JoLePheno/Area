package utils

import (
	"fmt"
	"gopkg.in/dgrijalva/jwt-go.v3"
)

func DecryptToken(token string) (jwt.MapClaims, bool, error)  {
	decryptToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte("aslkdjlkaj10830912039jlkoaiuwerasdjflkasd"), nil
	})
	claims, valid := decryptToken.Claims.(jwt.MapClaims)
	if !decryptToken.Valid {
		valid = false
	}
	return claims, valid, err
}