import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html'
})
export class ProductDetails implements OnInit {

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.productService.getAllProducts().subscribe((data: any) => {
      this.product = data.find((p: any) => p.id == id);
    });
  }
}