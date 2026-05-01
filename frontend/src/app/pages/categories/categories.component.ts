import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private svc = inject(CategoryService);

  categories: Category[] = [];
  editingId: string | null = null;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
  });

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.svc.list().subscribe((cats) => (this.categories = cats));
  }

  edit(c: Category) {
    this.editingId = c._id || null;
    this.form.patchValue({ name: c.name, description: c.description || '' });
  }

  cancel() {
    this.editingId = null;
    this.form.reset({ name: '', description: '' });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.value as Category;
    const obs = this.editingId ? this.svc.update(this.editingId, data) : this.svc.create(data);
    obs.subscribe({
      next: () => {
        Swal.fire('Saved', '', 'success');
        this.cancel();
        this.fetch();
      },
      error: (e) => Swal.fire('Error', e.error?.message || 'Failed', 'error'),
    });
  }

  remove(c: Category) {
    if (!c._id) return;
    Swal.fire({
      title: `Delete "${c.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
    }).then((r) => {
      if (r.isConfirmed) {
        this.svc.remove(c._id!).subscribe({
          next: () => {
            Swal.fire('Deleted', '', 'success');
            this.fetch();
          },
          error: (e) => Swal.fire('Cannot delete', e.error?.message || 'Failed', 'error'),
        });
      }
    });
  }
}
