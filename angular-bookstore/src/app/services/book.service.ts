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

  getBooks(theCatId : number,cpage:number,psize:number):Observable<GetResponseBooks>{
    const searchURL = `${this.baseUrl}/search/categoryid?id=${theCatId}&page=${cpage}&size=${psize}`
    return this.httpClient.get<GetResponseBooks>(searchURL);   
  }

  private getBookList(searchURL: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBooks>(searchURL).pipe(
      map(data => data._embedded.books)
    );
  }

  getBookCategory():Observable<BookCategory[]>{
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
      map(data=>data._embedded.bookCategory)
    );
  }

  searchBooks(_key : string,cpage:number,psize:number):Observable<GetResponseBooks>{
    const searchURL = `${this.baseUrl}/search/searchbykeyword?name=${_key}&page=${cpage}&size=${psize}`;
    return this.httpClient.get<GetResponseBooks>(searchURL);   
  }

  get(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.baseUrl}/${bookId}`);
  }

}

interface GetResponseBooks{
  _embedded:{
    books:Book[]
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetResponseBookCategory{
  _embedded:{
    bookCategory:BookCategory[]
  }
}