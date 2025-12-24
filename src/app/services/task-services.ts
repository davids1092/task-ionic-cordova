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
  // CREAR BASE EN CASO DE QUE NO EXISTA Y CARGAR LAS TAREAS
  async init() {
    await this.storage.create();
    this.tasks = (await this.storage.get(TASKS_KEY)) || [];
  }
  // COSNULTAR TAREAS
  getTasks() {
    return this.tasks;
  }
  // AÑADIR TAREA
  async addTask(title: string, categoryId?: string) {
    this.tasks.unshift({
      id: Date.now().toString(),
      title,
      completed: false,
      categoryId
    });
    await this.storage.set(TASKS_KEY, this.tasks);
  }
  // ACTUALIZAR TAREA
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


  // ACTUALIZAR ESTADO DE TAREA
  async toggleTask(task: Task) {
    task.completed = !task.completed;
    await this.storage.set(TASKS_KEY, this.tasks);
  }
  // BORRAR TAREA
  async deleteTask(id: string) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    await this.storage.set(TASKS_KEY, this.tasks);
  }
}
