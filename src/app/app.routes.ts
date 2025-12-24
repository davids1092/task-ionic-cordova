import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    loadComponent: () => import('./pages/todo/todo.page').then( m => m.TodoPage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
  },
];
