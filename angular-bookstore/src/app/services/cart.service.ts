import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[]=[];
  totalPrice : Subject<number> = new Subject<number>();
  totalQty:Subject<number> = new Subject<number>();
  constructor() { }

  addToCart(cartItem : CartItem){
    //object : add to cart array
    //check is duplicat
    let isDuplicateItem = false;
    let cItem = undefined;
    if(this.cartItems.length > 0 ) {
      cItem = this.cartItems.find( e => e.id === cartItem.id )
      isDuplicateItem = !!cItem
    }
    if(isDuplicateItem)  cItem.quantity++;
    else this.cartItems.push(cartItem)
    // calcaulte price
    this.calcTotalPrice();

  }

  calcTotalPrice() {
    let tPrice: number = 0;
    let tQty: number = 0;
    for (let curr_Item of this.cartItems) {
      tPrice += curr_Item.unitPrice * curr_Item.quantity;
      tQty += curr_Item.quantity;
    }
    this.totalPrice.next(tPrice);
    this.totalQty.next(tQty);
  }

  decrementItem(cItem: CartItem) {
    cItem.quantity--;
    if(cItem.quantity === 0){
      this.removeItem(cItem);
    }else {
      this.calcTotalPrice();
    }
  }
  removeItem(cItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(e => e.id===cItem.id)
    if(itemIndex !=-1){
      this.cartItems.splice(itemIndex,1)
      this.calcTotalPrice()
    }
  }
}
