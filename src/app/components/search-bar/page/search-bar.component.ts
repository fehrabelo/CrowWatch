import { Component, ElementRef, OnDestroy, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchFilm } from '../../films/models/films.types';
import { FilmsService } from '../../shared-data/films.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  // allPosts: SearchFilm[];
  allPosts: any;

  autoCompleteList: any[]

  page: number = 1;
  filmName: string

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();


  constructor(public filmService: FilmsService) { }

  ngOnInit(): void {

    this.filmService.ListFilms(this.filmName, this.page)
      .subscribe(posts => {
        console.log(posts);

        this.allPosts = posts

      });

    // when user types something in input, the value changes will come through this
    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })
  }


  ngOnDestroy(): void {
    // this.subs.map((sub: Subscription) => sub.unsubscribe)
  }

  private autoCompleteExpenseList(input: any) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  // this is where filtering the data happens according to you typed value
  filterCategoryList(val: any) {
    var categoryList = []
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allPosts.Search.filter((s: any) => s.Title.toLowerCase().indexOf(val.toLowerCase()) != -1) : this.allPosts;
  }

  // after you clicked an autosuggest option, this function will show the field you want to show in input
  displayFn(post: SearchFilm) {
    let k = post ? post.Title : post;
    return k;
  }



  filterPostList(event: any) {
    var posts = event.source.value;
    if (!posts) {
      this.filmService.searchOption = []
    }
    else {

      this.filmService.searchOption.push(posts);
      this.onSelectedOption.emit(this.filmService.searchOption)
    }
    this.focusOnPlaceInput();
  }

  removeOption(option: any) {

    let index = this.filmService.searchOption.indexOf(option);
    if (index >= 0)
      this.filmService.searchOption.splice(index, 1);
    this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.filmService.searchOption)
  }

  // focus the input field and remove any unwanted text.
  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }


}
