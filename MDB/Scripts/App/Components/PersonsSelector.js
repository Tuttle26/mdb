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
var PersonsSelector = (function () {
    function PersonsSelector() {
        this.remove = new core_1.EventEmitter();
    }
    PersonsSelector.prototype.onRemoveTag = function (tag) {
        this.remove.next(tag.value);
        tag.parentNode.removeChild(tag);
    };
    PersonsSelector.prototype.findPerson = function (id) {
        var person = this.all.find(function (el) { return el.ID == id; });
        return person.Name + " " + person.Surname;
    };
    PersonsSelector.prototype.onSelect = function (value) {
        if (!this.selected.some(function (el) { return el == value; }))
            this.selected.push(value);
        this.selected.sort(function (a, b) { return (a - b); });
    };
    PersonsSelector = __decorate([
        core_1.Component({
            selector: "persons-selector",
            inputs: ["all", "selected"],
            outputs: ["remove"],
            directives: [common_1.NgFor],
            template: "\n<div class=\"col-md-4\">\n    <div class=\"btn-group col-xs-2\">\n        <button class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            <span>Select Actor </span>\n            <span class=\"caret\"></span>\n        </button>\n        <ul class=\"dropdown-menu\" #selectBox>\n            <li *ngFor=\"#person of all\" (click)=\"onSelect(person.ID)\">\n                <a href=\"#\" >{{person.Name + \" \" + person.Surname}}</a>\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"col-xs-12\">\n        <ul class=\"list-group smallContainer\" #selectedActors>\n            <li class=\"list-group-item\" *ngFor=\"#selPerson of selected\" [value]=\"selPerson\" #person>\n                {{findPerson(selPerson)}}\n                <button class=\"btn btn-danger btn-xs glyphicon glyphicon-remove\" (click)=\"onRemoveTag(person)\"></button>\n            </li>\n        </ul>\n    </div>\n</div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], PersonsSelector);
    return PersonsSelector;
})();
exports.PersonsSelector = PersonsSelector;
//# sourceMappingURL=PersonsSelector.js.map