var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TagItem_1 = require("./../Model/TagItem");
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
var TagsService = (function () {
    function TagsService(http) {
        this.http = http;
        this.allTags = [];
        this.fetchTags();
    }
    TagsService.prototype.fetchTags = function () {
        var _this = this;
        var request = this.http.request("../../api/TagApi/GetAll");
        request.subscribe(function (response) {
            _this.allTags = response.json().map(function (tag) { return new TagItem_1.TagItem(tag); });
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    TagsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TagsService);
    return TagsService;
})();
exports.TagsService = TagsService;
//# sourceMappingURL=TagsService.js.map