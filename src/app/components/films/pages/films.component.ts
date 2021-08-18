import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISearchFilm, SearchFilm } from '../models/films.types';
import { FilmsService } from '../../shared-data/films.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  constructor(private film: FilmsService) { }

  //pagination
  page: number = 1;
  filmName: string;


  //variables
  filmData: SearchFilm[];

  ngOnInit(): void {

    this.subs.push(this.film.ListFilms(this.filmName, this.page)
      .subscribe(response => {
        console.log(response);
        this.filmDataHandler(response.Search)
        this.film.filmsData = response.Search

      }))

  }

  // getListFilms() {
  //   this.subs.push(this.film.ListFilms(this.filmName, this.apiKey, this.page)
  //     .subscribe(response => {
  //       console.log(response);
  //       this.filmDataHandler(response.Search)
  //     }))
  // }

  filmDataHandler(data: ISearchFilm[]) {
    console.log(data);
    this.filmData = data.map((item) => new SearchFilm(item));

  }

  ngOnDestroy(): void {
    this.subs.map((sub: Subscription) => sub.unsubscribe)
  }


  onSelectedOption(e: any) {
    console.log(e);
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.film.searchOption.length > 0)
      this.filmData = this.film.filteredListOptions();
    else {
      this.filmData = this.film.filmsData;
    }

    console.log(this.filmData)
  }

}
