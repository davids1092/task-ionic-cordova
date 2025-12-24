import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category-services';
import { AppIonicModule } from 'src/app/shared/ionic-components';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,AppIonicModule,IonIcon]
})
export class CategoriesPage {

  name = '';
  color = '#3dc2ff';
  editing: Category | null = null;

  constructor(public categoryService: CategoryService) {
    addIcons({createOutline,trashOutline });
  }

  get categories(): Category[] {
    return this.categoryService.getCategories();
  }

  save() {
    if (!this.name.trim()) return;

    if (this.editing) {
      this.categoryService.updateCategory(
        this.editing.id,
        this.name,
        this.color
      );
    } else {
      this.categoryService.addCategory(this.name, this.color);
    }

    this.reset();
  }

  edit(category: Category) {
    this.editing = category;
    this.name = category.name;
    this.color = category.color;
  }

  delete(id: string) {
    this.categoryService.deleteCategory(id);
  }

  reset() {
    this.name = '';
    this.color = '#3dc2ff';
    this.editing = null;
  }
}
