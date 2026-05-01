import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then((m) => m.ProductListComponent),
  },
  {
    path: 'products/new',
    loadComponent: () =>
      import('./pages/product-form/product-form.component').then((m) => m.ProductFormComponent),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: 'products/:id/edit',
    loadComponent: () =>
      import('./pages/product-form/product-form.component').then((m) => m.ProductFormComponent),
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/categories.component').then((m) => m.CategoriesComponent),
  },
  { path: '**', redirectTo: 'products' },
];
