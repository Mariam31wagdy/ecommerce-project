import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-wishlist',
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css'],
})
export class Wishlist {

  wishlistItems: any[] = [];

  constructor(private cartService: CartService) {
    this.wishlistItems = this.cartService.getWishlistItems();
  }

  removeFromWishlist(id: number) {
    this.cartService.removeFromWishlist(id);
    this.wishlistItems = [...this.cartService.getWishlistItems()];
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  clearWishlist() {
    this.wishlistItems.forEach((p: any) => this.cartService.removeFromWishlist(p.id));
    this.wishlistItems = [];
  }
}