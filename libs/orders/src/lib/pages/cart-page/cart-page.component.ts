import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit, OnDestroy {
  endSubs$ : Subject<any> = new Subject();
  cartItemDetailed : CartItemDetailed[] = [];
  cartCount : any;

  constructor(private router: Router, private cartService: CartService, private orderService: OrdersService) {}
  ngOnInit(): void {
    this._getCartDetails();
  }
  ngOnDestroy(): void {
      this.endSubs$.next(0);
      this.endSubs$.complete();

  }
  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart => {
      this.cartItemDetailed = [];
      this.cartCount = respCart?.items?.length ?? 0;
      respCart.items?.forEach((cartItem) => {
        this.orderService.getProduct(cartItem.productId).subscribe((respProduct) => {
          this.cartItemDetailed.push({
            product: respProduct,
            quantity:cartItem.quantity
          });
        });
      });
    });
  }
  backToShop() {
    this.router.navigate(['/products']);
  }
  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }
  updateCartItemQuantity(event :any , cartItem: CartItemDetailed){
    this.cartService.setCartItem({
      productId: cartItem.product.id,
      quantity: event.value
    },
    true);
  }
}
