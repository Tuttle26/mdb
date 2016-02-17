import {Component} from "angular2/core";
import {NgFor} from "angular2/common";
import {bootstrap} from "angular2/platform/browser";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS} from "angular2/router";
import {MoviesService} from "./Services/MoviesService";
import {TagsService} from "./Services/TagsService";
import {MovieItem} from "./Model/MovieItem";

@Component({
    selector: "movie-list",
    providers: [MoviesService, NgFor],
    template: ` 

<div class="navbar-form navbar-right">
    <a href="http://localhost:57851/Movies/Create">Add a new Movie</a>
</div>
<form class="navbar-form navbar-left" role="search">
    <div class="form-group">
        <input type="text" class="form-control" placeholder="Search by Title" #searchInput (keyup)="onSearchMovie(searchInput)">
    </div>
    <div class="input-group">
        <button type="button" class="btn btn-default" data-toggle="dropdown"><span class="caret"></span> {{tagKey}}</button>
        <ul class="dropdown-menu ">
            <li #default (click)="onChangeTagKey(default)"><a href="#">All</a></li>
            <li role="separator" class="divider"></li>
            <li *ngFor="#tag of tagsService.allTags" #dropdown (click)="onChangeTagKey(dropdown)"><a href="#"> {{tag.Name}}</a></li>
        </ul>
    </div> 
</form>

<table class="table">
    <tr>
        <th>
            Image
        </th>
        <th>
            Title
        </th>
        <th>
            Year
        </th>
        <th>
            Description
        </th>
        <th>
            Tags
        </th>
        <th>
            Options
        </th>
    </tr>

    <tr *ngFor="#movie of moviesService.movieItems" [hidden]="(!searchKey=='' && !containsSearchKey(movie.Title)) || !containsTagKey(movie.Tags)">
        <td>
            <img src="{{movie.ImgSrc}}" width="90" height="114" />
        </td>
        <td style="vertical-align:middle">
            <a href="http://localhost:57851/Movies/Details/{{movie.MovieID}}">{{movie.Title}}</a>
        </td>
        <td style="vertical-align:middle">
            {{movie.Year}}
        </td>
        <td class="col-xs-6" style="vertical-align:middle">
            {{movie.Description}}
        </td>
        <td style="vertical-align:middle">
            <ul *ngFor="#tag of movie.Tags"  class="col-xs-3 breadcrumb movieTag">
                <li>{{tagsService.allTags[tag].Name}}</li>
            </ul>
        </td>
        <td class="col-xs-1" style="vertical-align:middle">
            <a href="http://localhost:57851/Movies/Edit/{{movie.MovieID}}">Edit</a> |
            <a href="http://localhost:57851/Movies/Delete/{{movie.MovieID}}">Delete</a>
        </td>
    </tr>

</table>
              `
})

class MovieList {
    private searchKey: string = "";
    private tagKey: string = "All"
    private moviesService: MoviesService;
    private tagsService: TagsService;
    /*private allTags: string[] = ["Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "FilmNoir", "History",
        "Horror", "Music", "Musical", "Mystery", "Romance", "SciFi", "Sport", "Thriller", "War", "Western"];*/
    //Dependency Injection
    constructor(moviesService: MoviesService, tagsService: TagsService) {
        this.moviesService = moviesService;
        this.tagsService = tagsService;
    }
    private onSearchMovie(searchInput: HTMLInputElement) {
        if (searchInput.value.trim() == "") { this.searchKey = ""; return; }
        this.searchKey = searchInput.value.trim().toLowerCase();
    }
    private containsSearchKey(title: string): boolean {
        if (title.toLowerCase().indexOf(this.searchKey) >= 0) return true;
        return false;
    }
    private containsTagKey(tags: number[]): boolean {
        if (this.tagKey == "All") return true;
        for (var i = 0; i < tags.length; i++) {
            if (this.tagsService.allTags[tags[i]].Name.trim().indexOf(this.tagKey) >= 0) return true;
        }
        return false;
    }
    private onChangeTagKey(dropdown: HTMLInputElement) {
        this.tagKey = dropdown.innerText.trim();
    }
}

bootstrap(MovieList, [ROUTER_PROVIDERS, HTTP_PROVIDERS, MoviesService, TagsService]);