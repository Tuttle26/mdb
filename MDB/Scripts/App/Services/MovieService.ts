import {MovieItem} from "./../Model/MovieItem"
import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core'


@Injectable()
export class MovieService {
    public movie: MovieItem;
    private http: Http;

    constructor(http: Http) {
        this.http = http;
        this.movie = new MovieItem(-1, "", -1, "", null , [], -1, -1, []);
    }

    public fetchMovieItem(id: number) {
        let request = this.http.request("../../api/Movies/GetID/" + id);

        request.subscribe((response: Response) => {
            var tmp = response.json();
            this.movie = new MovieItem(tmp.MovieID, tmp.Title, tmp.Year, tmp.Description, tmp.ImgSrc, tmp.Tags, tmp.Director, tmp.Screenwriter, tmp.Actors);
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }

    public postMovie(movie: MovieItem) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("../../api/Movies/Edit/" + movie.MovieID, JSON.stringify(movie), { headers: headers }).subscribe(
            (response: Response) => { console.log(response.status + " " + response.statusText); },
            (error) => alert("Error: " + JSON.stringify(error))
        );
    }

    public putMovie(movie: MovieItem) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("../../api/Movies/Create", JSON.stringify(movie), { headers: headers }).subscribe(
            (response: Response) => { console.log(response.status + " " + response.statusText); },
            (error) => alert("Error: " + JSON.stringify(error))
        );
    }
}