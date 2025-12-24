import { inject, Injectable } from '@angular/core';
import {
  fetchAndActivate,
  getBoolean,
  RemoteConfig,
} from '@angular/fire/remote-config';

/**
 * Servicio para interactuar con Firebase Remote Config
 * Proporciona métodos para inicializar la configuración remota
 * y exponer flags que activan funcionalidades en la app.
 */
@Injectable({
  providedIn: 'root', 
})
export class FirebaseServices {
  // Inyección de RemoteConfig usando la nueva sintaxis de Angular
  private remoteConfig = inject(RemoteConfig);

  // Propiedades internas que almacenan el estado de las funcionalidades
  private _categoriesEnabled = false;
  private _taskEditEnabled = false;

  /**
   * Inicializa Firebase Remote Config
   * Configura y activa los valores remotos
   */
  async init() {
    // Configuración de Remote Config:
    // minimumFetchIntervalMillis: tiempo mínimo entre fetchs (0 para desarrollo)
    // fetchTimeoutMillis: tiempo máximo que espera por la respuesta de Remote Config
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 0,
      fetchTimeoutMillis: 60000,
    };

    // Obtener y activar los valores remotos
    await fetchAndActivate(this.remoteConfig);

    // Guardar los valores obtenidos de Remote Config en las propiedades internas
    this._categoriesEnabled = getBoolean(this.remoteConfig, 'enable_categories');
    this._taskEditEnabled = getBoolean(this.remoteConfig, 'enable_task_edit');
  }

  /**
   * Getter para saber si la funcionalidad de categorías está habilitada
   */
  get categoriesEnabled(): boolean {
    return this._categoriesEnabled;
  }

  /**
   * Getter para saber si la edición de tareas está habilitada
   */
  get taskEditEnabled(): boolean {
    return this._taskEditEnabled;
  }
}
