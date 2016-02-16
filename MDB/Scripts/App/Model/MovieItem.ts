export class MovieItem {
    public MovieID: number;
    public Title: string;
    public Year: number;
    public Description: string;
    public ImgSrc: URL;
    public Tags: number[];
    public Director: number;
    public Screenwriter: number;
    public Actors: number[];

    /*constructor(MovieID: number = -1, Title: string, Year: number, Description: string, ImgSrc: URL, Tags: number[]) {
        this.Year = Year;
        this.Title = Title;
        this.MovieID = MovieID;
        this.Description = Description;
        this.ImgSrc = ImgSrc;
        this.Tags = Tags;
    }*/

    constructor(MovieID: number = -1, Title: string, Year: number, Description: string, ImgSrc: URL, Tags: number[], Director?: number, Screenwriter?: number, Actors?: number[]) {
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

}
