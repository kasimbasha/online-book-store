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
  constructor(private bService : BookService, 
              private _aRoute : ActivatedRoute) { }

  ngOnInit(): void {
   this._aRoute.paramMap.subscribe(()=>{
      this.listBooks();
      }
    )
  }

  listBooks(){
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
}
