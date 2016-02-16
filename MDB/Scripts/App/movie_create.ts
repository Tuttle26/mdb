import {Component, Input} from "angular2/core";
import {NgFor} from "angular2/common";
import {bootstrap} from "angular2/platform/browser";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS} from "angular2/router";

import {MovieService} from "./Services/MovieService";
import {TagsService} from "./Services/TagsService";
import {PersonsService} from "./Services/PersonsService";

import {MovieItem} from "./Model/MovieItem";
import {TagItem} from "./Model/TagItem";
import {PersonItem} from "./Model/PersonItem";

import {TagSelector} from "./Components/TagSelector";
import {PersonSelector} from "./Components/PersonSelector";
import {PersonsSelector} from "./Components/PersonsSelector";

@Component({
    selector: "movie-create",
    directives: [NgFor, TagSelector, PersonSelector, PersonsSelector],
    providers: [MovieService, TagsService, PersonsService],
    template:
    `<div class="form-horizontal">
        <h4>Movie</h4>
        <hr />

        <div class="form-group">
            <label class = "control-label col-md-2">Title</label>
            <div class="col-md-10">
                <input type="text" class="form-control" #title/>
            </div>
        </div>

        <div class="form-group">
            <label class = "control-label col-md-2">Description</label>
            <div class="col-md-10">
                <input type="text" class="form-control" #description/>
            </div>
        </div>

        <div class="form-group">
            <label class = "control-label col-md-2">Year</label>
            <div class="col-md-10">
                <input type="text" class="form-control" #year/>
            </div>
        </div>

        <div class="form-group">
            <label class = "control-label col-md-2">Director</label>
            <person-selector class = "control-label col-md-8" [all]="personsService.directors" [selected]="movieService.movie.Director" (onSelect)="onDirectorSelect($event)"></person-selector>
        </div>

        <div class="form-group">
            <label class = "control-label col-md-2">Screenwriter</label>
            <person-selector class = "control-label col-md-8" [all]="personsService.screenwriters" [selected]="movieService.movie.Screenwriter" (onSelect)="onScreenwriterSelect($event)"></person-selector>
        </div>

        <div class="form-group">
            <label class = "control-label col-md-2">Actors</label>
            <persons-selector class = "control-label col-md-8" [all]="personsService.actors" [selected]="movieService.movie.Actors" (remove)="onRemoveActor($event)"></persons-selector>
        </div>

        <div class="form-group">
            <label class = "control-label col-md-2">Tags</label>
            <tag-selector class = "control-label col-md-8" [all]="tagsService.allTags" [selected]="movieService.movie.Tags" (remove)="onRemoveTag($event)"></tag-selector>
        </div>

        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <input type="submit" value="Save" (click)="onSubmit(title,description,year,tags)" class="btn btn-primary" />
            </div>
        </div>
    </div>
    `
})

export class MovieCreate {
    private movieService: MovieService;
    private tagsService: TagsService;
    private personsService: PersonsService;
    private selectedTags: TagItem[];
    private id: number;

    constructor(tagsService: TagsService, movieService: MovieService, personsService: PersonsService) {
        this.tagsService = tagsService;
        this.movieService = movieService;
        this.personsService = personsService;

        /*var parts = window.location.toString().split("/");
        var id = parts.pop();*/
    }

    private onSubmit(title: HTMLInputElement, description: HTMLInputElement, year: HTMLInputElement, tags: HTMLDivElement) {
        var movie: MovieItem = this.movieService.movie;
        movie.Title = title.value;
        movie.Description = description.value;
        movie.Year = parseInt(year.value);

        this.movieService.putMovie(movie);
    }

    private onRemoveTag(tag: number) {
        this.movieService.movie.Tags.splice(this.movieService.movie.Tags.indexOf(tag), 1);
    }

    private onDirectorSelect(id: number) {
        this.movieService.movie.Director = id;
    }

    private onScreenwriterSelect(id: number) {
        this.movieService.movie.Screenwriter = id;
    }

    private onRemoveActor(id: number) {
        this.movieService.movie.Actors.splice(this.movieService.movie.Actors.indexOf(id), 1);
    }
}

bootstrap(MovieCreate, [ROUTER_PROVIDERS, HTTP_PROVIDERS, MovieService, TagsService]);