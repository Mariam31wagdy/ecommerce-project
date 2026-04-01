import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
})
export class Details implements OnInit {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.getProductById(id!).subscribe(data => {
      this.product = data;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}