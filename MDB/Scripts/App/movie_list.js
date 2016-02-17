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
var browser_1 = require("angular2/platform/browser");
var http_1 = require("angular2/http");
var router_1 = require("angular2/router");
var MoviesService_1 = require("./Services/MoviesService");
var TagsService_1 = require("./Services/TagsService");
var MovieList = (function () {
    /*private allTags: string[] = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "FilmNoir", "History",
        "Horror", "Music", "Musical", "Mystery", "Romance", "SciFi", "Sport", "Thriller", "War", "Western"];*/
    //Dependency Injection
    function MovieList(moviesService, tagsService) {
        this.searchKey = "";
        this.tagKey = "All";
        this.moviesService = moviesService;
        this.tagsService = tagsService;
    }
    MovieList.prototype.onSearchMovie = function (searchInput) {
        if (searchInput.value.trim() == "") {
            this.searchKey = "";
            return;
        }
        this.searchKey = searchInput.value.trim().toLowerCase();
    };
    MovieList.prototype.containsSearchKey = function (title) {
        if (title.toLowerCase().indexOf(this.searchKey) >= 0)
            return true;
        return false;
    };
    MovieList.prototype.containsTagKey = function (tags) {
        if (this.tagKey == "All")
            return true;
        for (var i = 0; i < tags.length; i++) {
            if (this.tagsService.allTags[tags[i]].Name.trim().indexOf(this.tagKey) >= 0)
                return true;
        }
        return false;
    };
    MovieList.prototype.onChangeTagKey = function (dropdown) {
        this.tagKey = dropdown.innerText.trim();
    };
    MovieList = __decorate([
        core_1.Component({
            selector: "movie-list",
            providers: [MoviesService_1.MoviesService, common_1.NgFor],
            template: " \n\n<div class=\"navbar-form navbar-right\">\n    <a href=\"http://localhost:57851/Movies/Create\">Add a new Movie</a>\n</div>\n<form class=\"navbar-form navbar-left\" role=\"search\">\n    <div class=\"form-group\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Search by Title\" #searchInput (keyup)=\"onSearchMovie(searchInput)\">\n    </div>\n    <div class=\"input-group\">\n        <button type=\"button\" class=\"btn btn-default\" data-toggle=\"dropdown\"><span class=\"caret\"></span> {{tagKey}}</button>\n        <ul class=\"dropdown-menu \">\n            <li #default (click)=\"onChangeTagKey(default)\"><a href=\"#\">All</a></li>\n            <li role=\"separator\" class=\"divider\"></li>\n            <li *ngFor=\"#tag of tagsService.allTags\" #dropdown (click)=\"onChangeTagKey(dropdown)\"><a href=\"#\"> {{tag.Name}}</a></li>\n        </ul>\n    </div> \n</form>\n\n<table class=\"table\">\n    <tr>\n        <th>\n            Image\n        </th>\n        <th>\n            Title\n        </th>\n        <th>\n            Year\n        </th>\n        <th>\n            Description\n        </th>\n        <th>\n            Tags\n        </th>\n        <th>\n            Options\n        </th>\n    </tr>\n\n    <tr *ngFor=\"#movie of moviesService.movieItems\" [hidden]=\"(!searchKey=='' && !containsSearchKey(movie.Title)) || !containsTagKey(movie.Tags)\">\n        <td>\n            <img src=\"{{movie.ImgSrc}}\" width=\"90\" height=\"114\" />\n        </td>\n        <td style=\"vertical-align:middle\">\n            <a href=\"http://localhost:57851/Movies/Details/{{movie.MovieID}}\">{{movie.Title}}</a>\n        </td>\n        <td style=\"vertical-align:middle\">\n            {{movie.Year}}\n        </td>\n        <td class=\"col-xs-6\" style=\"vertical-align:middle\">\n            {{movie.Description}}\n        </td>\n        <td style=\"vertical-align:middle\">\n            <ul *ngFor=\"#tag of movie.Tags\"  class=\"col-xs-3 breadcrumb movieTag\">\n                <li>{{tagsService.allTags[tag].Name}}</li>\n            </ul>\n        </td>\n        <td class=\"col-xs-1\" style=\"vertical-align:middle\">\n            <a href=\"http://localhost:57851/Movies/Edit/{{movie.MovieID}}\">Edit</a> |\n            <a href=\"http://localhost:57851/Movies/Delete/{{movie.MovieID}}\">Delete</a>\n        </td>\n    </tr>\n\n</table>\n              "
        }), 
        __metadata('design:paramtypes', [MoviesService_1.MoviesService, TagsService_1.TagsService])
    ], MovieList);
    return MovieList;
})();
browser_1.bootstrap(MovieList, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, MoviesService_1.MoviesService, TagsService_1.TagsService]);
//# sourceMappingURL=movie_list.js.map