import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems : CartItem[]=[];
  totalPrice : number = 0;
  totalQty : number = 0;
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.showCartDetails()
  }
  showCartDetails() {
    this.cartItems = this._cartService.cartItems
    this._cartService.totalPrice.subscribe(d=>this.totalPrice=d);
    this._cartService.totalQty.subscribe(d=>this.totalQty=d);
    this._cartService.calcTotalPrice();
  }

  increamentItem(cItem : CartItem){
    this._cartService.addToCart(cItem)
  }

  decrementItem(cItem: CartItem){
    this._cartService.decrementItem(cItem);
  }

  deleteItem(cItem: CartItem){
    this._cartService.removeItem(cItem);
  }
}
