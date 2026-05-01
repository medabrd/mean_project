import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productSvc = inject(ProductService);
  private categorySvc = inject(CategoryService);

  categories: Category[] = [];
  editingId: string | null = null;
  imagePreview: string | null = null;
  pickedFile: File | null = null;
  submitting = false;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.min(0)]],
    category: ['', Validators.required],
  });

  ngOnInit() {
    this.categorySvc.list().subscribe((cs) => (this.categories = cs));
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingId = id;
      this.productSvc.get(id).subscribe((p) => {
        const cat = typeof p.category === 'object' ? p.category._id : p.category;
        this.form.patchValue({
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: cat || '',
        });
        if (p.image) this.imagePreview = this.productSvc.imageUrl(p.image);
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.pickedFile = file;
    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const v = this.form.value;
    const data = new FormData();
    data.append('name', v.name!);
    data.append('description', v.description || '');
    data.append('price', String(v.price));
    data.append('stock', String(v.stock));
    data.append('category', v.category!);
    if (this.pickedFile) data.append('image', this.pickedFile);

    const obs = this.editingId
      ? this.productSvc.update(this.editingId, data)
      : this.productSvc.create(data);

    obs.subscribe({
      next: () => {
        Swal.fire('Saved', `Product ${this.editingId ? 'updated' : 'created'}`, 'success');
        this.router.navigate(['/products']);
      },
      error: (e) => {
        this.submitting = false;
        Swal.fire('Error', e.error?.message || 'Could not save', 'error');
      },
    });
  }

  get f() {
    return this.form.controls;
  }
}
