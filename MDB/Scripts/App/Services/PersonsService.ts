import {PersonItem} from "./../Model/PersonItem"
import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core'

@Injectable()
export class PersonsService {
    public actors: PersonItem[];
    public directors: PersonItem[];
    public screenwriters: PersonItem[];
    private http: Http;

    constructor(http: Http) {
        this.actors = [];
        this.directors = [];
        this.screenwriters = [];
        this.http = http;
        this.fetchActors();
        this.fetchDirectors();
        this.fetchScreenwriters();
    }

    private fetchActors() {
        let request = this.http.request("../../api//Person/GetActors")

        request.subscribe((response: Response) => {
            this.actors = response.json().map(person => new PersonItem(person.ID,person.Name,person.Surname))
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }

    private fetchDirectors() {
        let request = this.http.request("../../api//Person/GetDirectors")

        request.subscribe((response: Response) => {
            this.directors = response.json().map(person => new PersonItem(person.ID, person.Name, person.Surname))
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }

    private fetchScreenwriters() {
        let request = this.http.request("../../api//Person/GetScreenwriters")

        request.subscribe((response: Response) => {
            this.screenwriters = response.json().map(person => new PersonItem(person.ID, person.Name, person.Surname))
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }
}