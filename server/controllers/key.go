package controllers

import "github.com/go-vgo/robotgo"

func KeyTap(action string, modifier string) {
	if len(modifier) > 0 {
		robotgo.KeyTap(action, modifier)
	} else {
		robotgo.KeyTap(action)
	}
}
