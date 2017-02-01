package main

import (
	"fmt"
	"html/template"
	"net/http"
	"regexp"
	"strconv"
)

//Page template
type Page struct {
	Title string
	Body  []byte
}

var templates = template.Must(template.ParseFiles("tmpl/index.html"))
var validPath = regexp.MustCompile("(^/$|^/(api/)$)")

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
	err := templates.ExecuteTemplate(w, tmpl+".html", p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func viewHandler(w http.ResponseWriter, r *http.Request, title string) {
	renderTemplate(w, "index", &Page{Title: "Sup.", Body: []byte("hello world")})
}

func apiHandler(w http.ResponseWriter, r *http.Request, title string) {
	fmt.Println("Hit the API handler, redirecting...")
	http.Redirect(w, r, "/view/"+title, http.StatusFound)
}

func makeHandler(fn func(http.ResponseWriter, *http.Request, string)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		m := validPath.FindStringSubmatch(r.URL.Path)
		if m == nil {
			http.NotFound(w, r)
			fmt.Print(r.URL.Path + " is not a valid path.\n")
			return
		}
		fn(w, r, m[2])
	}
}

func main() {
	port := 8080
	fmt.Print("listening on port " + strconv.Itoa(port) + "...\n")

	//handler for the css and js files.
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", makeHandler(viewHandler))
	http.HandleFunc("/api", makeHandler(apiHandler))
	http.ListenAndServe(":"+strconv.Itoa(port), nil)
}
