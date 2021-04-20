import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  constructor(private _cartService:CartService) { }
  totalPrice : number = 0
  totalQty : number = 0
  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus(){
    this._cartService.totalPrice.subscribe(data=>this.totalPrice=data);
    this._cartService.totalQty.subscribe(data=>this.totalQty=data);
  }
}
