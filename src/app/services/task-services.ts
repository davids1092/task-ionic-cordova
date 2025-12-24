import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../models/task.model';

const TASKS_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasks: Task[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.tasks = (await this.storage.get(TASKS_KEY)) || [];
  }

  getTasks() {
    return this.tasks;
  }

  async addTask(title: string, categoryId?: string) {
  this.tasks.unshift({
    id: Date.now().toString(),
    title,
    completed: false,
    categoryId
  });
  await this.storage.set(TASKS_KEY, this.tasks);
}

async updateTask(
  id: string,
  title: string,
  categoryId: string
) {
  const task = this.tasks.find(t => t.id === id);
  if (!task) return;

  task.title = title;
  task.categoryId = categoryId;

  await this.storage.set(TASKS_KEY, this.tasks);
}



  async toggleTask(task: Task) {
    task.completed = !task.completed;
    await this.storage.set(TASKS_KEY, this.tasks);
  }

  async deleteTask(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    await this.storage.set(TASKS_KEY, this.tasks);
  }
}
