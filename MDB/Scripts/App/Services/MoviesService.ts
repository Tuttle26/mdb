import {MovieItem} from "./../Model/MovieItem"
import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core'


@Injectable()
export class MoviesService {
    public movieItems: MovieItem[];
    private http: Http;

    constructor(http: Http) {
        this.movieItems = [];
        this.http = http;
        this.fetchMovieItems();
    }

    private fetchMovieItems() {
        let request = this.http.request("api/Movies")

        request.subscribe((response: Response) => {
            this.movieItems = response.json().map(movie => new MovieItem(movie.MovieID, movie.Title, movie.Year, movie.Description, movie.ImgSrc, movie.Tags))
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }
}