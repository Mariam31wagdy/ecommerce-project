import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {

  cartItems: any[] = [];
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartItems = this.cartService.getCartItems();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = [...this.cartService.getCartItems()];
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  increaseQty(index: number) {
    this.cartItems[index].quantity = (this.cartItems[index].quantity || 1) + 1;
    this.cartService.saveCart();
  }

  decreaseQty(index: number) {
    if ((this.cartItems[index].quantity || 1) > 1) {
      this.cartItems[index].quantity--;
      this.cartService.saveCart();
    }
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  checkout() {
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/checkout']);
  } else {
    this.router.navigate(['/login']);
  }
}
}