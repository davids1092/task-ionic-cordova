import { Component, OnInit } from '@angular/core';
import { IonApp, IonIcon, IonRouterOutlet } from '@ionic/angular/standalone';
import { AppIonicModule } from './shared/ionic-components';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {  flashOutline, folderOutline,  } from 'ionicons/icons';
import { FirebaseServices } from './services/firebase-services';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet,AppIonicModule,RouterModule,IonIcon],
})
export class AppComponent implements  OnInit {

  constructor(public fireBaseConfig: FirebaseServices) {
     addIcons({ flashOutline, folderOutline });
  }

 async ngOnInit() {
  // INICIAR CONEXION CON FIREBASE
    await this.fireBaseConfig.init();
  }
}
