import {Component} from "angular2/core";
import {NgFor} from "angular2/common";
import {NgClass, NgIf} from "angular2/common";
import {bootstrap} from "angular2/platform/browser";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS} from "angular2/router";
import {UserMovieService} from "./Services/UserMovieService";

@Component({
    selector: "user-movie",
    providers: [NgFor, NgClass, NgIf],
    template: ` 
            <div [hidden] = "userMovieService.userMovie == null">
                <a [class]="starClass(1)" (click)="setRating(1)"></a>
                <a [class]="starClass(2)" (click)="setRating(2)"></a>
                <a [class]="starClass(3)" (click)="setRating(3)"></a>
                <a [class]="starClass(4)" (click)="setRating(4)"></a>
                <a [class]="starClass(5)" (click)="setRating(5)"></a>
            </div>
            <div class=" col-xs-4">
                Avg. Rating : {{ userMovieService.userMovie == null ? "N/A" : userMovieService.userMovie.AvgRating}}
            </div>
            <div class="btn-group col-xs-2">
                <button [disabled]="userMovieService.userMovie == null" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span>{{userMovieService.userMovie == null ? 'N/A ' : allStates[userMovieService.userMovie.Category] }}</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li *ngFor="#state of allStates; #i = index" [class]="userMovieService.userMovie != null && userMovieService.userMovie.Category == i ? 'active' : ' '" (click)="setCategory(i)">
                        <a href="#">{{state}}</a>
                    </li>
                </ul>
            </div>
              `
})

class UserMovie {
    private userMovieService: UserMovieService;
    private allStates: string[] = ["None", "Watched", "To Watch", "Not Interested"]

    constructor(userMovieService: UserMovieService) {
        this.userMovieService = userMovieService;
    }

    private setRating(rating: number) {
        this.userMovieService.syncUserMovies(rating, this.userMovieService.userMovie.Category);
    }

    private starClass(starIndex: number): string {
        if (this.userMovieService.userMovie == null || this.userMovieService.userMovie.Rating == null)
            return "glyphicon glyphicon-star-empty";
        if (starIndex <= this.userMovieService.userMovie.Rating) {
            return "glyphicon glyphicon-star";
        }
        return "glyphicon glyphicon-star-empty";
    }

    private setCategory(category: number) {
        this.userMovieService.syncUserMovies(this.userMovieService.userMovie.Rating, category);
    }
}
bootstrap(UserMovie, [ROUTER_PROVIDERS, HTTP_PROVIDERS, UserMovieService]);