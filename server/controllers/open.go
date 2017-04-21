package controllers

import (
	"log"
	"net/http"

	"github.com/labstack/echo"
	"github.com/skratchdot/open-golang/open"
)

func Open(c echo.Context) error {
	path := c.QueryParam("path")
	log.Println(path)
	open.Start(path)

	return c.String(http.StatusOK, "{}")
}
