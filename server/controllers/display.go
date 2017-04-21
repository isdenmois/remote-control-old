package controllers

import (
	"os/exec"
)

func DisplaySwitch(direction string) {
	exec.Command("DisplaySwitch.exe", "/"+direction).Run()
}
