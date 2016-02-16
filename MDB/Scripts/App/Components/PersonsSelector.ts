import {Component, Input, EventEmitter} from "angular2/core";
import {NgFor} from "angular2/common";

import {PersonItem} from "./../Model/PersonItem";

@Component({
    selector: "persons-selector",
    inputs: ["all", "selected"],
    outputs: ["remove"],
    directives: [NgFor],
    template:
    `
<div class="col-md-4">
    <div class="btn-group col-xs-2">
        <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span>Select Actor </span>
            <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" #selectBox>
            <li *ngFor="#person of all" (click)="onSelect(person.ID)">
                <a href="#" >{{person.Name + " " + person.Surname}}</a>
            </li>
        </ul>
    </div>

    <div class="col-xs-12">
        <ul class="list-group smallContainer" #selectedActors>
            <li class="list-group-item" *ngFor="#selPerson of selected" [value]="selPerson" #person>
                {{findPerson(selPerson)}}
                <button class="btn btn-danger btn-xs glyphicon glyphicon-remove" (click)="onRemoveTag(person)"></button>
            </li>
        </ul>
    </div>
</div>
    `
})

export class PersonsSelector {

    public selected: number[];
    public all: PersonItem[];
    public remove: EventEmitter<number>;

    constructor() {
        this.remove = new EventEmitter();
    }

    private onRemoveTag(tag: HTMLLIElement) {
        this.remove.next(tag.value);
        tag.parentNode.removeChild(tag);
    }

    private findPerson(id: number) {
        var person = this.all.find(el => el.ID == id);

        return person.Name + " " + person.Surname;
    }

    private onSelect(value: number) {
        if (!this.selected.some(el => el == value))
            this.selected.push(value);
        this.selected.sort((a, b) => (a - b));
    }
}