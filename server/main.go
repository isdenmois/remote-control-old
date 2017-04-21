package server

import (
	"github.com/labstack/echo"

	"github.com/crgimenes/goConfig"
	_ "github.com/crgimenes/goConfig/json"
	"github.com/isdenmois/remote-control/server/controllers"
)

type RemoteControlServer struct {
	Echo   *echo.Echo
	Config serverConfig
}

func (s RemoteControlServer) Index(c echo.Context) error {
	return c.File(s.Config.Client + "/index.html")
}

/**
 * Start server.
 */
func (s *RemoteControlServer) Start() {
	s.Echo = echo.New()
	s.Config = serverConfig{}
	goConfig.File = "config.json"
	goConfig.Parse(&s.Config)

	e := s.Echo
	config := s.Config
	films := controllers.FilmsHandler{
		QBittorrent: config.QBittorent,
		Category:    config.Films,
	}
	serials := controllers.FilmsHandler{
		QBittorrent: config.QBittorent,
		Category:    config.Serials,
	}

	e.POST("/api/button/:action", controllers.ButtonHandler)
	e.GET("/api/films", films.Serve)
	e.GET("/api/serials", serials.Serve)
	e.POST("/api/open", controllers.Open)

	e.Static("/static", config.Client)
	e.GET("*", s.Index)

	address := config.serverAddress()
	e.Logger.Fatal(e.Start(address))
}
