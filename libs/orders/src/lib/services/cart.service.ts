import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';


export const CART_KEY = "cart";
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor() { }

  initCartLocalStorage(){
    const cart : Cart = this.getCart();
    if(!cart){
    const initialCart = {
      items: []
    }
    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY, initialCartJson);
   }
  }
  getCart(){
    const cartJsonString: string= localStorage.getItem(CART_KEY) || '{"items": []}';
    const cart : Cart = JSON.parse(cartJsonString);
    return cart;
  }
  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();
    const existingCartItem = cart.items?.find(item => item.productId === cartItem.productId);

    if (existingCartItem) {
        existingCartItem.quantity += cartItem.quantity;
    } else {
        cart.items?.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
}

}
