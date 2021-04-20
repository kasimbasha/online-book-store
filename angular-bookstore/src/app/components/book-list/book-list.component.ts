import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartItem } from 'src/app/common/cart-item';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { Book } from '../../common/book';

@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[]=[];
  currCatId: number=1;
  privousCatId:number=1;
  isSearchMode: boolean;
  cPage : number =1
  pageSize : number = 5
  totalRecords : number = 0
  //pageSize: number = 4;
 // pageOfItems: Array<Book>;
  constructor(private bService: BookService,
    private _aRoute: ActivatedRoute,
    private _cartService : CartService,
    private _spinerService : NgxSpinnerService,
     _config:NgbPaginationConfig) {
      _config.maxSize=3;
      _config.boundaryLinks = true;
     }

  ngOnInit(): void {
    console.log("This page size "+this.pageSize)
    this._aRoute.paramMap.subscribe(() => {
      this.listBooks();
    }
    )
  }

  listBooks() {
    this._spinerService.show()
    this.isSearchMode = this._aRoute.snapshot.paramMap.has('keyword');
    if (this.isSearchMode) {
      this.searchModeList()
    }
    else {
      this.defaultBooKList()
    }
  }

 // onChangePage(pageOfItems: Array<Book>) {
    // update current page of items
  //  this.pageOfItems = pageOfItems;
 // }
  defaultBooKList() {
    const hasCategoryId: boolean = this._aRoute.snapshot.paramMap.has('id')
    if (hasCategoryId) {
      this.currCatId = +this._aRoute.snapshot.params['id']
    }
    else {
      this.currCatId = 1;
    }
    // reset the page number to 1 if categiry changed
    if(this.privousCatId!=this.currCatId)
      this.cPage =1
    this.privousCatId = this.currCatId;

    this.bService.getBooks(this.currCatId,this.cPage-1,this.pageSize).subscribe(
     this.processPaginate()
    )
  }
  processPaginate() {
    return data => {
     //setTimeout(() => {
      this._spinerService.hide();
      this.books = data._embedded.books;
      this.cPage = data.page.number+1;
      this.pageSize = data.page.size;
      this.totalRecords = data.page.totalElements;
    // }, 1000);
    }
  }

  searchModeList() {
    const keywrd: string = this._aRoute.snapshot.params['keyword']
    return this.bService.searchBooks(keywrd,this.cPage-1,this.pageSize).subscribe(
      this.processPaginate()
    )
  }

updatePageSize(pageSize:number){ 
  this.pageSize = pageSize;
  this.cPage = 1;
  this.listBooks()
}

addToCart(book: Book){
  const cItem = new CartItem(book);
  this._cartService.addToCart(cItem)
}
}
