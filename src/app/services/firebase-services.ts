import { inject, Injectable } from '@angular/core';
import {
  fetchAndActivate,
  getBoolean,
  RemoteConfig,
} from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServices {
  private remoteConfig = inject(RemoteConfig);

  private _categoriesEnabled = false;
  private _taskEditEnabled = false;

  async init() {
    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 0,
      fetchTimeoutMillis: 60000,
    };

    await fetchAndActivate(this.remoteConfig);

    // Guardar los valores en propiedades internas
    this._categoriesEnabled = getBoolean(this.remoteConfig, 'enable_categories');
    this._taskEditEnabled = getBoolean(this.remoteConfig, 'enable_task_edit');
  }

  get categoriesEnabled(): boolean {
    return this._categoriesEnabled;
  }

  get taskEditEnabled(): boolean {
    return this._taskEditEnabled;
  }
}
