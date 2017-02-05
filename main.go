package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"regexp"
	"strconv"
	"strings"
)

type style struct {
	StyleName  string `json:"styleName"`
	StyleValue string `json:"styleValue"`
}
type notFound struct {
	Error string `json:"error"`
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("index handler, request url " + r.URL.Path)
	http.ServeFile(w, r, "static/index.html")
}

//can test this with just curl localhost:8080/api/
func apiHandler(w http.ResponseWriter, r *http.Request) {
	var validPath = regexp.MustCompile("^/api/")
	m := validPath.FindStringSubmatch(r.URL.Path)
	if m == nil {
		http.NotFound(w, r)
		fmt.Println(r.URL.Path + " is not a valid path")
		return
	}

	urlArgs := sliceFromURL(r.URL.Path)
	data := apiRouter(urlArgs)

	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
	fmt.Println(string(data))
	return
}

/* Takes the remaining parts of the url and routes to the proper functions.
   Making these cases with anon structs saves a bunch of definitions up top. */
func apiRouter(params []string) []byte {
	if len(params) > 0 {
		switch params[0] {
		case "style":
			response, err := json.Marshal(struct {
				Data style `json:"data"`
			}{style{params[1], params[2]}})
			if err != nil {
				return errorJSON(err)
			}
			return response
		case "wow":
			response, err := json.Marshal(struct {
				Data style `json:"data"`
			}{style{params[1], params[2]}})
			if err != nil {
				return errorJSON(err)
			}
			return response
		default:
			return errorJSON(errors.New("requested API section not found"))
		}
	}
	return errorJSON(errors.New("api args were empty"))
}

/* returns a standard JSON encoded error */
func errorJSON(e error) []byte {
	response, err := json.Marshal(struct {
		Error string `json:"error"`
	}{e.Error()})
	if err != nil {
		panic("Error encoding the JSON error. Something went horribly wrong.")
	}
	return response
}

/* convenience fn to remove the "" and "api" when we split */
func sliceFromURL(s string) []string {
	urlParts := strings.Split(s, "/")
	if urlParts[0] == "" {
		urlParts = urlParts[1:]
	}
	if urlParts[len(urlParts)-1] == "" {
		urlParts = urlParts[:len(urlParts)-1]
	}
	return urlParts[1:]
}

func main() {
	port := 8080
	fmt.Println("listening on port " + strconv.Itoa(port) + "...\n")
	http.HandleFunc("/api/", apiHandler)
	http.HandleFunc("/", indexHandler)

	//handler for the css and js files.
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.ListenAndServe(":"+strconv.Itoa(port), nil)
}
