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
var MovieService = (function () {
    function MovieService(http) {
        this.http = http;
        this.movie = new MovieItem_1.MovieItem(-1, "", -1, "", null, [], -1, -1, []);
    }
    MovieService.prototype.fetchMovieItem = function (id) {
        var _this = this;
        var request = this.http.request("../../api/Movies/GetID/" + id);
        request.subscribe(function (response) {
            var tmp = response.json();
            _this.movie = new MovieItem_1.MovieItem(tmp.MovieID, tmp.Title, tmp.Year, tmp.Description, tmp.ImgSrc, tmp.Tags, tmp.Director, tmp.Screenwriter, tmp.Actors);
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    MovieService.prototype.postMovie = function (movie) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("../../api/Movies/Edit/" + movie.MovieID, JSON.stringify(movie), { headers: headers }).subscribe(function (response) { console.log(response.status + " " + response.statusText); }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    MovieService.prototype.putMovie = function (movie) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("../../api/Movies/Create", JSON.stringify(movie), { headers: headers }).subscribe(function (response) { console.log(response.status + " " + response.statusText); }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    MovieService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MovieService);
    return MovieService;
})();
exports.MovieService = MovieService;
//# sourceMappingURL=MovieService.js.map