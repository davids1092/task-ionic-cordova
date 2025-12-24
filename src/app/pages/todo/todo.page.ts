import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Task } from '../../models/task.model';
import { AppIonicModule } from 'src/app/shared/ionic-components';
import { TaskService } from 'src/app/services/task-services';
import { CategoryService } from 'src/app/services/category-services';
import { Category } from 'src/app/models/category.model';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, AppIonicModule,IonIcon]
})
export class TodoPage implements OnInit {
  newTask = '';
  selectedCategoryId: string | null = null;
  taskCategoryId: string | null = null;
  editingTaskId: string | null = null;

  constructor(public taskService: TaskService,
      public categoryService: CategoryService
  ) { 
    addIcons({createOutline,trashOutline });
  }

  ngOnInit() {
  }

  get tasks(): Task[] {
    return this.taskService.getTasks();
  }

saveTask() {
  if (!this.newTask.trim() || !this.taskCategoryId) return;

  if (this.editingTaskId) {
    this.taskService.updateTask(
      this.editingTaskId,
      this.newTask,
      this.taskCategoryId
    );
  } else {
    this.taskService.addTask(
      this.newTask,
      this.taskCategoryId
    );
  }

  this.resetForm();
}
editTask(task: Task) {
  this.editingTaskId = task.id;
  this.newTask = task.title;
  this.taskCategoryId = task.categoryId ?? null;
}
resetForm() {
  this.newTask = '';
  this.taskCategoryId = null;
  this.editingTaskId = null;
}



  


  toggleTask(task: Task) {
    this.taskService.toggleTask(task);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  trackById(_: number, task: Task) {
    return task.id;
  }
  // CATEGORY

  get categories(): Category[] {
  return this.categoryService.getCategories();
}

get filteredTasks() {
  const tasks = this.taskService.getTasks();
  if (!this.selectedCategoryId) return tasks;
  return tasks.filter(t => t.categoryId === this.selectedCategoryId);
}

getCategoryName(categoryId?: string): string {
  if (!categoryId) return '';
  return this.categories.find(c => c.id === categoryId)?.name ?? '';
}

getCategoryColor(categoryId?: string): string {
  if (!categoryId) return '#cccccc';
  return this.categories.find(c => c.id === categoryId)?.color ?? '#cccccc';
}
async ionViewWillEnter() {
  await this.categoryService.loadCategories();
}


}
