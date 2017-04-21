package controllers

import (
	"log"
	"net/http"

	"github.com/labstack/echo"
)

func actionExecuter(action string, params string) {
	switch action {
	case "displayswitch":
		DisplaySwitch(params)

	case "shutdown":
		Shutdown()

	default:
		KeyTap(action, params)
	}
}

func ButtonHandler(c echo.Context) error {
	action := c.Param("action")
	modifier := c.QueryParam("modifiers")

	log.Printf("Button handler: %s", action)

	go actionExecuter(action, modifier)
	return c.String(http.StatusOK, "{}")
}
