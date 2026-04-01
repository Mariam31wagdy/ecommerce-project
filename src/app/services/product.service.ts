import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<any>('https://dummyjson.com/products?limit=100').pipe(
      map((res: any) => res.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.thumbnail,
        rating: { rate: p.rating, count: p.stock }
      })))
    );
  }

  getProductById(id: string) {
    return this.http.get<any>(`https://dummyjson.com/products/${id}`).pipe(
      map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.thumbnail,
        rating: { rate: p.rating, count: p.stock }
      }))
    );
  }
}