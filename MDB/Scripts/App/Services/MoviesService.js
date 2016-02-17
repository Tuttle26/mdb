var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MovieItem_1 = require("./../Model/MovieItem");
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
var MoviesService = (function () {
    function MoviesService(http) {
        this.movieItems = [];
        this.http = http;
        this.fetchMovieItems();
    }
    MoviesService.prototype.fetchMovieItems = function () {
        var _this = this;
        var request = this.http.request("api/Movies");
        request.subscribe(function (response) {
            _this.movieItems = response.json().map(function (movie) { return new MovieItem_1.MovieItem(movie.MovieID, movie.Title, movie.Year, movie.Description, movie.ImgSrc, movie.Tags); });
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    MoviesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MoviesService);
    return MoviesService;
})();
exports.MoviesService = MoviesService;
//# sourceMappingURL=MoviesService.js.map