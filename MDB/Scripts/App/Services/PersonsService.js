var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PersonItem_1 = require("./../Model/PersonItem");
var http_1 = require('angular2/http');
var core_1 = require('angular2/core');
var PersonsService = (function () {
    function PersonsService(http) {
        this.actors = [];
        this.directors = [];
        this.screenwriters = [];
        this.http = http;
        this.fetchActors();
        this.fetchDirectors();
        this.fetchScreenwriters();
    }
    PersonsService.prototype.fetchActors = function () {
        var _this = this;
        var request = this.http.request("../../api//Person/GetActors");
        request.subscribe(function (response) {
            _this.actors = response.json().map(function (person) { return new PersonItem_1.PersonItem(person.ID, person.Name, person.Surname); });
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    PersonsService.prototype.fetchDirectors = function () {
        var _this = this;
        var request = this.http.request("../../api//Person/GetDirectors");
        request.subscribe(function (response) {
            _this.directors = response.json().map(function (person) { return new PersonItem_1.PersonItem(person.ID, person.Name, person.Surname); });
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    PersonsService.prototype.fetchScreenwriters = function () {
        var _this = this;
        var request = this.http.request("../../api//Person/GetScreenwriters");
        request.subscribe(function (response) {
            _this.screenwriters = response.json().map(function (person) { return new PersonItem_1.PersonItem(person.ID, person.Name, person.Surname); });
        }, function (error) { return alert("Error: " + JSON.stringify(error)); });
    };
    PersonsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PersonsService);
    return PersonsService;
})();
exports.PersonsService = PersonsService;
//# sourceMappingURL=PersonsService.js.map