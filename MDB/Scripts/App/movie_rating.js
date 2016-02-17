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
var MovieRating = (function () {
    function MovieRating() {
        this.starClasses = ["glyphicon glyphicon-star-empty", "glyphicon glyphicon-star"];
        this.stars = [0, 0, 0, 0, 0];
    }
    MovieRating.prototype.setStarRating = function (rating) {
        for (var i = 0; i <= rating; i++) {
            this.stars[i] = 1;
        }
        for (var i = rating + 1; i < this.stars.length; i++) {
            this.stars[i] = 0;
        }
        this.syncRating();
    };
    MovieRating.prototype.syncRating = function () {
    };
    MovieRating = __decorate([
        core_1.Component({
            selector: "movie-rating",
            providers: [common_1.NgFor, common_2.NgClass],
            template: " \n                <a *ngFor=\"#star of stars; #i = index\" [class]=\"starClasses[star]\" (click)=\"setStarRating(i)\" ></a>\n              "
        }), 
        __metadata('design:paramtypes', [])
    ], MovieRating);
    return MovieRating;
})();
browser_1.bootstrap(MovieRating, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=movie_rating.js.map