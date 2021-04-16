import { Component, OnInit } from '@angular/core';
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
  constructor(private bService : BookService) { }

  ngOnInit(): void {
    this.listBooks()
  }

  listBooks(){
    this.bService.getBooks().subscribe(
      data=> this.books = data
    )
  }
}
