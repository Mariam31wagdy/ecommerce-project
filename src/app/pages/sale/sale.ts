import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  standalone: true,
  selector: 'app-sale',
  imports: [CommonModule, RouterModule],
  templateUrl: './sale.html',
  styleUrls: ['./sale.css'],
})
export class Sale implements OnInit {

  isLoggedIn = false;
  saleProducts: any[] = [];
  loading = true;

  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();

    if (this.isLoggedIn) {
      this.productService.getAllProducts().subscribe((data: any) => {
        // خد أول 20 منتج كـ sale
        this.saleProducts = data.slice(0, 20);
        this.loading = false;
        this.cdr.detectChanges();
      });
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}