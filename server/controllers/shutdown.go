package controllers

import "os/exec"

func Shutdown() {
	exec.Command("shutdown.exe", "/s", "/d", "u:4:5", "/f", "/t", "0").Run()
}
