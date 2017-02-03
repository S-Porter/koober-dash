package main

import (
	"fmt"
	"net/http"
	"regexp"
	"strconv"
)

var validPath = regexp.MustCompile("(^/$|^/(api/)$)")

func indexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Print("index handler, request url " + r.URL.Path + "   ")
	http.ServeFile(w, r, "static/index.html")
}

func apiHandler(w http.ResponseWriter, r *http.Request) {
	m := validPath.FindStringSubmatch(r.URL.Path)
	if m == nil {
		http.NotFound(w, r)
		fmt.Print(r.URL.Path + " is not a valid path.\n")
		return
	}
	fmt.Print("api handler, request url " + r.URL.Path + "   ")
	http.Redirect(w, r, "/", http.StatusFound)
}

func main() {
	port := 8080
	fmt.Print("listening on port " + strconv.Itoa(port) + "...\n")
	http.HandleFunc("/api/", apiHandler)
	http.HandleFunc("/", indexHandler)

	//handler for the css and js files.
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.ListenAndServe(":"+strconv.Itoa(port), nil)
}
