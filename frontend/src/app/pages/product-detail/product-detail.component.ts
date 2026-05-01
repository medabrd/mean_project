import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container" *ngIf="product">
      <a routerLink="/products" class="btn btn-link mb-3">← Back to products</a>
      <div class="row g-4">
        <div class="col-md-6">
          <img [src]="imageUrl()" class="detail-img" [alt]="product.name" />
        </div>
        <div class="col-md-6">
          <span class="badge bg-secondary mb-2">{{ catName }}</span>
          <h2>{{ product.name }}</h2>
          <p class="text-muted">{{ product.description }}</p>
          <h3 class="text-primary">{{ product.price | currency:'USD' }}</h3>
          <p>
            Stock: <strong>{{ product.stock }}</strong>
          </p>
          <div class="d-flex gap-2 mt-4">
            <a [routerLink]="['/products', product._id, 'edit']" class="btn btn-primary">Edit</a>
            <button class="btn btn-danger" (click)="remove()">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <div class="container" *ngIf="!product && !error">
      <div class="text-center py-5"><div class="spinner-border"></div></div>
    </div>

    <div class="container" *ngIf="error">
      <div class="alert alert-danger">{{ error }}</div>
      <a routerLink="/products" class="btn btn-secondary">Back</a>
    </div>
  `,
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productSvc = inject(ProductService);

  product?: Product;
  error = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productSvc.get(id).subscribe({
      next: (p) => (this.product = p),
      error: (e) => (this.error = e.error?.message || 'Product not found'),
    });
  }

  imageUrl(): string {
    return this.productSvc.imageUrl(this.product?.image);
  }

  get catName(): string {
    const c = this.product?.category as Category | undefined;
    return c && typeof c === 'object' ? c.name : '';
  }

  remove() {
    if (!this.product?._id) return;
    Swal.fire({
      title: 'Delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
    }).then((r) => {
      if (r.isConfirmed) {
        this.productSvc.remove(this.product!._id!).subscribe(() => {
          Swal.fire('Deleted', '', 'success');
          this.router.navigate(['/products']);
        });
      }
    });
  }
}
