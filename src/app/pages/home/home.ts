import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {

  products: any[] = [];
  productList: any[] = [];
  loading = true;
  error = '';
  activeCategory = 'all';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.productList = data;
        this.loading = false;
        this.cdr.detectChanges(); // ← هنا

        this.route.queryParams.subscribe(params => {
          const cat = params['category'];
          if (cat) {
            this.activeCategory = cat;
            this.productList = this.products.filter((p: any) =>
              p.category === cat
            );
          } else {
            this.activeCategory = 'all';
            this.productList = this.products;
          }
          this.cdr.detectChanges(); // ← وهنا
        });

        this.searchService.currentSearch.subscribe((text: string) => {
          if (!text) {
            this.productList = this.activeCategory === 'all'
              ? this.products
              : this.products.filter((p: any) => p.category === this.activeCategory);
          } else {
            this.productList = this.products.filter((p: any) =>
              p.title.toLowerCase().includes(text.toLowerCase())
            );
          }
          this.cdr.detectChanges(); // ← وهنا
        });
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
        this.cdr.detectChanges(); // ← وهنا
      }
    });
  }

  filterByCategory(cat: string) {
    this.activeCategory = cat;
    if (cat === 'all') {
      this.productList = this.products;
    } else {
      this.productList = this.products.filter((p: any) => p.category === cat);
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  toggleWishlist(product: any) {
    if (this.cartService.isInWishlist(product.id)) {
      this.cartService.removeFromWishlist(product.id);
    } else {
      this.cartService.addToWishlist(product);
    }
  }

  isInWishlist(id: number): boolean {
    return this.cartService.isInWishlist(id);
  }

  getStars(rate: number): string[] {
    const stars = [];
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    for (let i = 0; i < full; i++) stars.push('full');
    if (half) stars.push('half');
    for (let i = 0; i < empty; i++) stars.push('empty');
    return stars;
  }
}