import { Category } from './category.model';

export interface Product {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  image?: string;
  category: string | Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductQuery {
  search?: string;
  category?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'name';
  page?: number;
  limit?: number;
}
