import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl="http://localhost:8080/api/v1/books";
  private categoryUrl="http://localhost:8080/api/v1/book-category";

  constructor(private httpClient : HttpClient) { }

  getBooks(theCatId : number):Observable<Book[]>{
    const searchURL = `${this.baseUrl}/search/categoryid?id=${theCatId}`
    return this.httpClient.get<GetResponseBooks>(searchURL).pipe(
      map(data=>data._embedded.books)
    );
  }

  getBookCategory():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(data=>data._embedded.bookCategory)
    );
  }
}

interface GetResponseBooks{
  _embedded:{
    books:Book[]
  }
}

interface GetResponseBookCategory{
  _embedded:{
    bookCategory:BookCategory[]
  }
}