package controllers

import (
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"github.com/pquerna/ffjson/ffjson"
)

type torrentItem struct {
	Name      string
	Hash      string
	Save_path string
}

type File struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

type Film struct {
	Name  string `json:"name"`
	Hash  string `json:"hash"`
	Path  string `json:"path"`
	Files []File `json:"files"`
}

func request(url string, result interface{}) {
	resp, _ := http.Get(url)
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	ffjson.Unmarshal([]byte(body), &result)
}

func Parse(api string, category string) []Film {
	var result []torrentItem
	request(api+"/query/torrents?category="+url.QueryEscape(category), &result)

	var films []Film
	for _, item := range result {
		film := Film{}
		film.Name = item.Name
		film.Hash = item.Hash
		film.Path = item.Save_path

		var files []File
		request(api+"/query/propertiesFiles/"+film.Hash, &files)

		for _, fileItem := range files {
			if !strings.Contains(fileItem.Name, "unwanted") {
				film.Files = append(film.Files, File{
					Name: fileItem.Name,
					Path: film.Path + fileItem.Name,
				})
			}
		}

		films = append(films, film)
	}

	return films
}
