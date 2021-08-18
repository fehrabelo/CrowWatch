export interface Ifilm {
    Response: boolean;
    Search: ISearchFilm[]
    totalResults: number;
}

export interface ISearchFilm {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export class SearchFilm {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;

    constructor(data: ISearchFilm) {
        this.Poster = data.Poster;
        this.Title = data.Title;
        this.Type = data.Type;
        this.Year = data.Year;
        this.imdbID = data.imdbID;
    }
}

