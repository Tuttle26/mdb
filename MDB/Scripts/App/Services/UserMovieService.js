var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
var UserMovieService = (function () {
    function UserMovieService(http) {
        this.http = http;
        this.movieId = window.location.toString().split("/").pop();
        this.fetchUserMovie();
    }
    UserMovieService.prototype.fetchUserMovie = function () {
        var _this = this;
        var request = this.http.request("http://localhost:57851/api/Movies/UserMovie/" + this.movieId);
        request.subscribe(function (response) {
            try {
                _this.userMovie = response.json();
            }
            catch (Error) {
                alert(Error.message);
            }
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    UserMovieService.prototype.syncUserMovies = function (rating, category) {
        var _this = this;
        if (rating === void 0) { rating = this.userMovie.Rating; }
        if (category === void 0) { category = this.userMovie.Category; }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post("http://localhost:57851/api/Movies/UserMovie/" + this.movieId, JSON.stringify({ "rating": rating, "category": category }), { headers: headers }).subscribe(function (response) { _this.fetchUserMovie(); }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    UserMovieService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserMovieService);
    return UserMovieService;
})();
exports.UserMovieService = UserMovieService;
//# sourceMappingURL=UserMovieService.js.map