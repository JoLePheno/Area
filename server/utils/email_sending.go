package utils

import "gopkg.in/gomail.v2"

func SendConfirmationEmail(url, to string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", "bolmog.noreply@gmail.com")
	m.SetHeader("To", to)
	m.SetHeader("Subject", "Confirm Email")
	m.SetBody("text/html", "Please click <a href="+url+">here</a> to confirm your email")

	d := gomail.NewPlainDialer("smtp.gmail.com", 465, "bolmog.noreply@gmail.com", "longbeach2019-2020")

	return d.DialAndSend(m)
}

func SendEmail(to, subject, body string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", "bolmog.noreply@gmail.com")
	m.SetHeader("To", to)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", body)

	d := gomail.NewPlainDialer("smtp.gmail.com", 465, "bolmog.noreply@gmail.com", "longbeach2019-2020")

	return d.DialAndSend(m)
}