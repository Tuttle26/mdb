import {TagItem} from "./../Model/TagItem"
import {Http, HTTP_PROVIDERS, Response, RequestOptions, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core'


@Injectable()
export class TagsService {
    public allTags: TagItem[];
    private http: Http;

    constructor(http: Http) {
        this.http = http;
        this.allTags = [];
        this.fetchTags();
    }

    public fetchTags() {
        let request = this.http.request("../../api/TagApi/GetAll");

        request.subscribe((response: Response) => {
            this.allTags = response.json().map(tag => new TagItem(tag))
        }, (error) => alert("Error: " + JSON.stringify(error)));
    }
}