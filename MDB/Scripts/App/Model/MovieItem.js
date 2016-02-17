var MovieItem = (function () {
    /*constructor(MovieID: number = -1, Title: string, Year: number, Description: string, ImgSrc: URL, Tags: number[]) {
        this.Year = Year;
        this.Title = Title;
        this.MovieID = MovieID;
        this.Description = Description;
        this.ImgSrc = ImgSrc;
        this.Tags = Tags;
    }*/
    function MovieItem(MovieID, Title, Year, Description, ImgSrc, Tags, Director, Screenwriter, Actors) {
        if (MovieID === void 0) { MovieID = -1; }
        this.Year = Year;
        this.Title = Title;
        this.MovieID = MovieID;
        this.Description = Description;
        this.ImgSrc = ImgSrc;
        this.Tags = Tags;
        this.Director = Director ? Director : null;
        this.Screenwriter = Screenwriter ? Screenwriter : null;
        this.Actors = Actors ? Actors : null;
    }
    return MovieItem;
})();
exports.MovieItem = MovieItem;
//# sourceMappingURL=MovieItem.js.map