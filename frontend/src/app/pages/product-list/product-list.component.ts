import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  private productSvc = inject(ProductService);
  private categorySvc = inject(CategoryService);

  products: Product[] = [];
  categories: Category[] = [];
  loading = false;

  search = '';
  selectedCategory = '';
  sort: 'newest' | 'price_asc' | 'price_desc' | 'name' = 'newest';

  ngOnInit() {
    this.categorySvc.list().subscribe((cats) => (this.categories = cats));
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.productSvc
      .list({
        search: this.search || undefined,
        category: this.selectedCategory || undefined,
        sort: this.sort,
      })
      .subscribe({
        next: (res) => {
          this.products = res.items;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }

  resetFilters() {
    this.search = '';
    this.selectedCategory = '';
    this.sort = 'newest';
    this.fetch();
  }

  imageUrl(p: Product): string {
    return this.productSvc.imageUrl(p.image);
  }

  catName(p: Product): string {
    return typeof p.category === 'object' ? p.category.name : '';
  }

  remove(p: Product) {
    Swal.fire({
      title: 'Delete this product?',
      text: p.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((r) => {
      if (r.isConfirmed && p._id) {
        this.productSvc.remove(p._id).subscribe(() => {
          Swal.fire('Deleted', 'Product removed', 'success');
          this.fetch();
        });
      }
    });
  }
}
