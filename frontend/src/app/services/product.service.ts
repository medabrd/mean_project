import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product, ProductListResponse, ProductQuery } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/api/products`;

  list(q: ProductQuery = {}): Observable<ProductListResponse> {
    let params = new HttpParams();
    if (q.search) params = params.set('search', q.search);
    if (q.category) params = params.set('category', q.category);
    if (q.sort) params = params.set('sort', q.sort);
    if (q.page) params = params.set('page', q.page);
    if (q.limit) params = params.set('limit', q.limit);
    return this.http.get<ProductListResponse>(this.base, { params });
  }

  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  create(data: FormData): Observable<Product> {
    return this.http.post<Product>(this.base, data);
  }

  update(id: string, data: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.base}/${id}`, data);
  }

  remove(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.base}/${id}`);
  }

  imageUrl(image?: string): string {
    if (!image) return 'https://via.placeholder.com/600x400?text=No+Image';
    if (image.startsWith('http')) return image;
    return `${environment.apiUrl}${image}`;
  }
}
