import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartItems: any[] = [];
  wishlistItems: any[] = [];

  constructor() {
    const cart = localStorage.getItem('cart');
    if (cart) this.cartItems = JSON.parse(cart);

    const wishlist = localStorage.getItem('wishlist');
    if (wishlist) this.wishlistItems = JSON.parse(wishlist);
  }

  addToCart(product: any) {
    this.cartItems.push({ ...product, quantity: 1 });
    this.saveCart();
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItems;
  }

  getTotal() {
    return this.cartItems
      .reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  }

  // Wishlist
  addToWishlist(product: any) {
    const exists = this.wishlistItems.find((p: any) => p.id === product.id);
    if (!exists) {
      this.wishlistItems.push(product);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
    }
  }

  removeFromWishlist(id: number) {
    this.wishlistItems = this.wishlistItems.filter((p: any) => p.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems));
  }

  isInWishlist(id: number) {
    return this.wishlistItems.some((p: any) => p.id === id);
  }

  getWishlistItems() {
    return this.wishlistItems;
  }
}