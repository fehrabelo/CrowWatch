import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ifilm, ISearchFilm, SearchFilm } from '../films/models/films.types';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  searchOption: any = []
  public filmsData: SearchFilm[];

  //pagination
  page: number;
  apiKey: string = "28d0dee8";
  filmName: string;
  constructor(private http: HttpClient) { }

  ListFilms(filmName: string, page: number): Observable<Ifilm> {
    return this.http.get<Ifilm>(`http://www.omdbapi.com/?s=${filmName}&apikey=${this.apiKey}&page=${page}`)
  }


  filteredListOptions() {
    debugger
    let posts = this.filmsData;
    console.log(posts);

    let filteredPostsList: any = [];
    console.log(filteredPostsList);

    for (let post of posts) {
      for (let options of this.searchOption) {
        if (options.Title === post.Title) {
          filteredPostsList.push(post);
        }
      }
    }
    console.log(filteredPostsList);
    return filteredPostsList;
  }

}
