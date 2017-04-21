package controllers

import (
	"net/http"

	"github.com/labstack/echo"
)

type FilmsHandler struct {
	QBittorrent string
	Category    string
}

func (fh FilmsHandler) Serve(c echo.Context) error {
	return c.JSON(http.StatusOK, Parse(fh.QBittorrent, fh.Category))
}
