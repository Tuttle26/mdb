import {Component, Input, EventEmitter} from "angular2/core";
import {NgFor} from "angular2/common";

import {TagItem} from "./../Model/TagItem";

@Component({
    selector: "tag-selector",
    inputs: ["all", "selected"],
    outputs: ["remove"],
    directives: [NgFor],
    template:
    `
    <div class="col-md-4">
        <div class="btn-group col-xs-2">
            <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span>Select Tag </span>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu" #selectBox>
                <li *ngFor="#tag of all;#i = index" (click)="onSelect(i)">
                    <a href="#" >{{tag.Name}}</a>
                </li>
            </ul>
        </div>
        
        <div class="col-xs-12">
            <ul class="list-group smallContainer" #selectedTags>
                <li class="list-group-item" *ngFor="#selTag of selected" [value]="selTag" #tag>
                    {{all[selTag].Name}} 
                    <button class="btn btn-danger btn-xs glyphicon glyphicon-remove" (click)="onRemoveTag(tag)"></button>
                </li>
            </ul>
        </div>
    </div>
    `
})

export class TagSelector {

    public selected: number[];
    public all: TagItem[];
    public remove: EventEmitter<number>;

    constructor() {
        this.remove = new EventEmitter();
    }

    private onRemoveTag(tag: HTMLLIElement) {
        this.remove.next(tag.value);
        tag.parentNode.removeChild(tag);
    }

    private onSelect(value: number) {
        if (!this.selected.some(el => el == value))
            this.selected.push(value);
        this.selected.sort((a, b) => (a - b));
    }
}