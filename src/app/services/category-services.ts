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
  // CREAR BASE EN CASO DE QUE NO EXISTA Y CARGAR LAS CATEGORIAS
  async init() {
    await this.storage.create();
    this.categories = (await this.storage.get(CATEGORY_KEY)) || [];
  }
  // CARGAR CATEGORIAS
  async loadCategories() {
    await this.storage.create();
    this.categories = (await this.storage.get(CATEGORY_KEY)) || [];
  }
  // OBTENER CATEGORIAS
  getCategories(): Category[] {
    return this.categories;
  }
  // CREAR O ÑADIR CATEGORIA
  async addCategory(name: string, color: string) {
    this.categories.push({
      id: Date.now().toString(),
      name,
      color
    });
    await this.storage.set(CATEGORY_KEY, this.categories);
  }
  // ACTUALIZAR CATEGORIA
  async updateCategory(id: string, name: string, color: string) {
    const cat = this.categories.find(c => c.id === id);
    if (!cat) return;

    cat.name = name;
    cat.color = color;
    await this.storage.set(CATEGORY_KEY, this.categories);
  }
  // BORRAR CATEGORIA
  async deleteCategory(id: string) {
    this.categories = this.categories.filter(c => c.id !== id);
    await this.storage.set(CATEGORY_KEY, this.categories);
  }
}
