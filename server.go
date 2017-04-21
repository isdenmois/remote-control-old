package main

import (
	"github.com/isdenmois/remote-control/server"
)

func main() {
	s := server.RemoteControlServer{}
	s.Start()
}
