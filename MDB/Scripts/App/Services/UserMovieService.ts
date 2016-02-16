import {UserMovie} from "./../Model/UserMovie"
import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core'


@Injectable()
export class UserMovieService {
    private http: Http;
    private movieId: string;
    public userMovie: UserMovie;

    constructor(http: Http) {
        this.http = http;
        this.movieId = window.location.toString().split("/").pop();
        this.fetchUserMovie();
    }

    private fetchUserMovie() {

        let request = this.http.request("http://localhost:57851/api/Movies/UserMovie/" + this.movieId)

        request.subscribe((response: Response) => {
            try {
                this.userMovie = response.json();
            } catch (Error) {
                alert(Error.message);
            }
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }

    public syncUserMovies(rating: number = this.userMovie.Rating, category: number = this.userMovie.Category) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:57851/api/Movies/UserMovie/" + this.movieId, JSON.stringify({ "rating": rating, "category": category }), { headers: headers }).subscribe(
            (response: Response) => { this.fetchUserMovie() },
            (error) => alert("Error: " + JSON.stringify(error))
        );
    }
}