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
var PersonSelector = (function () {
    function PersonSelector() {
        this.onSelect = new core_1.EventEmitter();
    }
    PersonSelector.prototype.findPerson = function (id) {
        if (this.all.length != 0 && this.selected != -1) {
            var person = this.all.find(function (el) { return el.ID == id; });
            return person.Name + " " + person.Surname;
        }
        else
            return "N/A";
    };
    PersonSelector.prototype.findPersonAll = function (id) {
        if (this.all.length != 0) {
            var person = this.all.find(function (el) { return el.ID == id; });
            return person.Name + " " + person.Surname;
        }
        else
            return "N/A";
    };
    PersonSelector.prototype.onSelectChange = function (person) {
        this.selected = person.ID;
        this.onSelect.next(this.selected);
    };
    PersonSelector = __decorate([
        core_1.Component({
            selector: "person-selector",
            inputs: ["all", "selected"],
            outputs: ["onSelect"],
            directives: [common_1.NgFor],
            template: "\n    <div class=\"col-md-4\">\n        <div class=\"btn-group col-xs-2\">\n            <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                <span>{{findPerson(selected)}}</span>\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\">\n                <li *ngFor=\"#person of all; #i = index\" [class]=\"all != null && selected != null && person.ID == selected ? 'active' : ' '\" (click)=\"onSelectChange(person)\">\n                    <a href=\"#\">{{findPersonAll(person.ID)}}</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], PersonSelector);
    return PersonSelector;
})();
exports.PersonSelector = PersonSelector;
//# sourceMappingURL=PersonSelector.js.map