import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS} from "angular2/router";

@Component({
    selector: "movie-rating",
    template: ` 

                <h2>TEST</h2>
                <input type="number" class="rating" data-size="xs" step="1"/>
              `
})

class MovieRating {
    constructor() {
    }
}

bootstrap(MovieRating, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);