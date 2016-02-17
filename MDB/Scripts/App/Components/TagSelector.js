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
var TagSelector = (function () {
    function TagSelector() {
        this.remove = new core_1.EventEmitter();
    }
    TagSelector.prototype.onRemoveTag = function (tag) {
        this.remove.next(tag.value);
        tag.parentNode.removeChild(tag);
    };
    TagSelector.prototype.onSelect = function (value) {
        if (!this.selected.some(function (el) { return el == value; }))
            this.selected.push(value);
        this.selected.sort(function (a, b) { return (a - b); });
    };
    TagSelector = __decorate([
        core_1.Component({
            selector: "tag-selector",
            inputs: ["all", "selected"],
            outputs: ["remove"],
            directives: [common_1.NgFor],
            template: "\n    <div class=\"col-md-4\">\n        <div class=\"btn-group col-xs-2\">\n            <button class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                <span>Select Tag </span>\n                <span class=\"caret\"></span>\n            </button>\n            <ul class=\"dropdown-menu\" #selectBox>\n                <li *ngFor=\"#tag of all;#i = index\" (click)=\"onSelect(i)\">\n                    <a href=\"#\" >{{tag.Name}}</a>\n                </li>\n            </ul>\n        </div>\n        \n        <div class=\"col-xs-12\">\n            <ul class=\"list-group smallContainer\" #selectedTags>\n                <li class=\"list-group-item\" *ngFor=\"#selTag of selected\" [value]=\"selTag\" #tag>\n                    {{all[selTag].Name}} \n                    <button class=\"btn btn-danger btn-xs glyphicon glyphicon-remove\" (click)=\"onRemoveTag(tag)\"></button>\n                </li>\n            </ul>\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TagSelector);
    return TagSelector;
})();
exports.TagSelector = TagSelector;
//# sourceMappingURL=TagSelector.js.map