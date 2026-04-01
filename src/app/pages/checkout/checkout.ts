import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout {

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  address = '';
  city = '';
  postal = '';
  country = 'Egypt';
  cardNumber = '';
  expiry = '';
  cvv = '';
  cardName = '';
  paymentMethod = 'card';
  submitted = false;
  orderPlaced = false;

  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  placeOrder() {
    this.submitted = true;

    if (!this.firstName || !this.lastName || !this.email || !this.address || !this.city) {
      return;
    }

    if (this.paymentMethod === 'card' && (!this.cardNumber || !this.expiry || !this.cvv || !this.cardName)) {
      return;
    }

    this.orderPlaced = true;
    this.cartService.clearCart();

    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 3000);
  }
}