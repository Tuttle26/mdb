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
var MovieService_1 = require("./Services/MovieService");
var TagsService_1 = require("./Services/TagsService");
var PersonsService_1 = require("./Services/PersonsService");
var TagSelector_1 = require("./Components/TagSelector");
var PersonSelector_1 = require("./Components/PersonSelector");
var PersonsSelector_1 = require("./Components/PersonsSelector");
var MovieEdit = (function () {
    function MovieEdit(tagsService, movieService, personsService) {
        this.tagsService = tagsService;
        this.movieService = movieService;
        this.personsService = personsService;
        /*var parts = window.location.toString().split("/");
        var id = parts.pop();*/
        this.id = parseInt(document.getElementsByTagName("movie-edit")[0].getAttribute("movie-id"));
        this.movieService.fetchMovieItem(this.id);
    }
    MovieEdit.prototype.onSubmit = function (title, description, year, tags) {
        var movie = this.movieService.movie;
        movie.Title = title.value;
        movie.Description = description.value;
        movie.Year = parseInt(year.value);
        this.movieService.postMovie(movie);
    };
    MovieEdit.prototype.onRemoveTag = function (tag) {
        this.movieService.movie.Tags.splice(this.movieService.movie.Tags.indexOf(tag), 1);
    };
    MovieEdit.prototype.onDirectorSelect = function (id) {
        this.movieService.movie.Director = id;
    };
    MovieEdit.prototype.onScreenwriterSelect = function (id) {
        this.movieService.movie.Screenwriter = id;
    };
    MovieEdit.prototype.onRemoveActor = function (id) {
        this.movieService.movie.Actors.splice(this.movieService.movie.Actors.indexOf(id), 1);
    };
    MovieEdit = __decorate([
        core_1.Component({
            selector: "movie-edit",
            directives: [common_1.NgFor, TagSelector_1.TagSelector, PersonSelector_1.PersonSelector, PersonsSelector_1.PersonsSelector],
            providers: [MovieService_1.MovieService, TagsService_1.TagsService, PersonsService_1.PersonsService],
            template: "<div class=\"form-horizontal\">\n        <h4>Movie</h4>\n        <hr />\n\n        <div class=\"form-group\">\n            <label class = \"control-label col-md-2\">Title</label>\n            <div class=\"col-md-10\">\n                <input type=\"text\" class=\"form-control\" [value]=\"movieService.movie.Title\" #title/>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label class = \"control-label col-md-2\">Description</label>\n            <div class=\"col-md-10\">\n                <input type=\"text\" class=\"form-control\" [value]=\"movieService.movie.Description\" #description/>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label class = \"control-label col-md-2\">Year</label>\n            <div class=\"col-md-10\">\n                <input type=\"text\" class=\"form-control\" [value]=\"movieService.movie.Year\" #year/>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label class = \"control-label col-md-2\">Director</label>\n            <person-selector class = \"control-label col-md-8\" [all]=\"personsService.directors\" [selected]=\"movieService.movie.Director\" (onSelect)=\"onDirectorSelect($event)\"></person-selector>\n        </div>\n\n        <div class=\"form-group\">\n            <label class = \"control-label col-md-2\">Screenwriter</label>\n            <person-selector class = \"control-label col-md-8\" [all]=\"personsService.screenwriters\" [selected]=\"movieService.movie.Screenwriter\" (onSelect)=\"onScreenwriterSelect($event)\"></person-selector>\n        </div>\n\n        <div class=\"form-group\">\n            <label class = \"control-label col-md-2\">Actors</label>\n            <persons-selector class = \"control-label col-md-8\" [all]=\"personsService.actors\" [selected]=\"movieService.movie.Actors\" (remove)=\"onRemoveActor($event)\"></persons-selector>\n        </div>\n\n        <div class=\"form-group\">\n            <label class = \"control-label col-md-2\">Tags</label>\n            <tag-selector class = \"control-label col-md-8\" [all]=\"tagsService.allTags\" [selected]=\"movieService.movie.Tags\" (remove)=\"onRemoveTag($event)\"></tag-selector>\n        </div>\n\n        <div class=\"form-group\">\n            <div class=\"col-md-offset-2 col-md-10\">\n                <input type=\"submit\" value=\"Save\" (click)=\"onSubmit(title,description,year,tags)\" class=\"btn btn-primary\" />\n            </div>\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [TagsService_1.TagsService, MovieService_1.MovieService, PersonsService_1.PersonsService])
    ], MovieEdit);
    return MovieEdit;
})();
exports.MovieEdit = MovieEdit;
browser_1.bootstrap(MovieEdit, [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, MovieService_1.MovieService, TagsService_1.TagsService]);
//# sourceMappingURL=movie_edit.js.map