import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/common/book';
import { CartItem } from 'src/app/common/cart-item';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book : Book = new Book();
  constructor(private _aR : ActivatedRoute,private bService:BookService,private cServie:CartService) { }

  ngOnInit(): void {
    this. getBookInfo();
  }

  getBookInfo(){
    const bookId : number = +this._aR.snapshot.params['id'];
     this.bService.get(bookId).subscribe(data=>this.book = data);
  }

  addToCart(){
    const cItem = new CartItem(this.book);
    this.cServie.addToCart(cItem);
  }
}
