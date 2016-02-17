var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var common_1 = require("angular2/common");
var common_2 = require("angular2/common");
var browser_1 = require("angular2/platform/browser");
var http_1 = require("angular2/http");
var router_1 = require("angular2/router");
var UserMovieService_1 = require("./Services/UserMovieService");
var UserMovie = (function () {
    function UserMovie(userMovieService) {
        this.allStates = ["None", "Watched", "To Watch", "Not Interested"];
        this.userMovieService = userMovieService;
    }
    UserMovie.prototype.setRating = function (rating) {
        this.userMovieService.syncUserMovies(rating, this.userMovieService.userMovie.Category);
    };
    UserMovie.prototype.starClass = function (starIndex) {
        if (this.userMovieService.userMovie == null || this.userMovieService.userMovie.Rating == null)
            return "glyphicon glyphicon-star-empty";
        if (starIndex <= this.userMovieService.userMovie.Rating) {
            return "glyphicon glyphicon-star";
        }
        return "glyphicon glyphicon-star-empty";
    };
    UserMovie.prototype.setCategory = function (category) {
        this.userMovieService.syncUserMovies(this.userMovieService.userMovie.Rating, category);
    };
    UserMovie = __decorate([
        core_1.Component({
            selector: "user-movie",
            providers: [common_1.NgFor, common_2.NgClass, common_2.NgIf],
            template: " \n            <div [hidden] = \"userMovieService.userMovie == null\">\n                <a [class]=\"starClass(1)\" (click)=\"setRating(1)\"></a>\n                <a [class]=\"starClass(2)\" (click)=\"setRating(2)\"></a>\n                <a [class]=\"starClass(3)\" (click)=\"setRating(3)\"></a>\n                <a [class]=\"starClass(4)\" (click)=\"setRating(4)\"></a>\n                <a [class]=\"starClass(5)\" (click)=\"setRating(5)\"></a>\n            </div>\n            <div class=\" col-xs-4\">\n                Avg. Rating : {{ userMovieService.userMovie == null ? \"N/A\" : userMovieService.userMovie.AvgRating}}\n            </div>\n            <div class=\"btn-group col-xs-2\">\n                <button [disabled]=\"userMovieService.userMovie == null\" type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                    <span>{{userMovieService.userMovie == null ? 'N/A ' : allStates[userMovieService.userMovie.Category] }}</span>\n                    <span class=\"caret\"></span>\n                </button>\n                <ul class=\"dropdown-menu\">\n                    <li *ngFor=\"#state of allStates; #i = index\" [class]=\"userMovieService.userMovie != null && userMovieService.userMovie.Category == i ? 'active' : ' '\" (click)=\"setCategory(i)\">\n                        <a href=\"#\">{{state}}</a>\n                    </li>\n                </ul>\n            </div>\n              "
        }), 
        __metadata('design:paramtypes', [UserMovieService_1.UserMovieService])
    ], UserMovie);
    return UserMovie;
})();
browser_1.bootstrap(UserMovie, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, UserMovieService_1.UserMovieService]);
//# sourceMappingURL=user_movie.js.map