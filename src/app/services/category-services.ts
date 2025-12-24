import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../models/category.model';

const CATEGORY_KEY = 'categories';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private categories: Category[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.categories = (await this.storage.get(CATEGORY_KEY)) || [];
  }

  async loadCategories() {
  await this.storage.create();
  this.categories = (await this.storage.get(CATEGORY_KEY)) || [];
}

  getCategories(): Category[] {
    return this.categories;
  }

  async addCategory(name: string, color: string) {
    this.categories.push({
      id: Date.now().toString(),
      name,
      color
    });
    await this.storage.set(CATEGORY_KEY, this.categories);
  }
  async updateCategory(id: string, name: string, color: string) {
  const cat = this.categories.find(c => c.id === id);
  if (!cat) return;

  cat.name = name;
  cat.color = color;
  await this.storage.set(CATEGORY_KEY, this.categories);
}

  async deleteCategory(id: string) {
    this.categories = this.categories.filter(c => c.id !== id);
    await this.storage.set(CATEGORY_KEY, this.categories);
  }
}
