import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import {Book} from '../../common/book';

@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books:Book [];
  currCatId : number;
  isSearchMode : boolean;
  constructor(private bService : BookService, 
              private _aRoute : ActivatedRoute) { }

  ngOnInit(): void {
   this._aRoute.paramMap.subscribe(()=>{
      this.listBooks();
      }
    )
  }

  listBooks(){
    this.isSearchMode = this._aRoute.snapshot.paramMap.has('keyword');
    if(this.isSearchMode){
      this.searchModeList()
    }
    else {
      this.defaultBooKList()
    }
  }

  defaultBooKList(){
    const hasCategoryId : boolean =this._aRoute.snapshot.paramMap.has('id')
    if(hasCategoryId){
      this.currCatId = +this._aRoute.snapshot.params['id']
    }
    else {
      this.currCatId = 1;
    }
    this.bService.getBooks(this.currCatId).subscribe(
      data=> this.books = data
    )
  }

  searchModeList(){
    const keywrd:string = this._aRoute.snapshot.params['keyword']
    return this.bService.searchBooks(keywrd).subscribe(
      data=>this.books = data
    )
  }



}
