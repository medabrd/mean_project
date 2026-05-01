import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/api/categories`;

  list(): Observable<Category[]> {
    return this.http.get<Category[]>(this.base);
  }

  get(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.base}/${id}`);
  }

  create(data: Category): Observable<Category> {
    return this.http.post<Category>(this.base, data);
  }

  update(id: string, data: Category): Observable<Category> {
    return this.http.put<Category>(`${this.base}/${id}`, data);
  }

  remove(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.base}/${id}`);
  }
}
