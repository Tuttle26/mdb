import {Component, Input, EventEmitter} from "angular2/core";
import {NgFor} from "angular2/common";

import {PersonItem} from "./../Model/PersonItem";

@Component({
    selector: "person-selector",
    inputs: ["all", "selected"],
    outputs: ["onSelect"],
    directives: [NgFor],
    template:
    `
    <div class="col-md-4">
        <div class="btn-group col-xs-2">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span>{{findPerson(selected)}}</span>
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li *ngFor="#person of all; #i = index" [class]="all != null && selected != null && person.ID == selected ? 'active' : ' '" (click)="onSelectChange(person)">
                    <a href="#">{{findPersonAll(person.ID)}}</a>
                </li>
            </ul>
        </div>
    </div>
    `
})

export class PersonSelector {

    public selected: number;
    public all: PersonItem[];
    public onSelect: EventEmitter<number>;

    constructor() {
        this.onSelect = new EventEmitter();
    }

    private findPerson(id :number) {
        if (this.all.length != 0 && this.selected != -1) {
            var person = this.all.find(el => el.ID == id);

            return person.Name + " " + person.Surname;
        }
        else
            return "N/A";
    }

    private findPersonAll(id: number) {
        if (this.all.length != 0) {
            var person = this.all.find(el => el.ID == id);

            return person.Name + " " + person.Surname;
        }
        else
            return "N/A";
    }

    private onSelectChange(person: PersonItem) {
        this.selected = person.ID;

        this.onSelect.next(this.selected);
    }
}