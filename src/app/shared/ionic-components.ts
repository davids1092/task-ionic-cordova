import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonList,
    IonCheckbox,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonBadge,
    IonMenuToggle,
    IonApp,
    IonMenu,
    IonMenuButton,
    IonIcon,
    IonButtons

} from '@ionic/angular/standalone';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonItem,
        IonInput,
        IonButton,
        IonList,
        IonCheckbox,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonBadge,
        IonHeader,
        IonMenuToggle,
        IonApp,
        IonMenu,
        IonMenuButton,
        IonIcon,
        IonButtons


    ],
    exports: [
        CommonModule,
        FormsModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonItem,
        IonInput,
        IonButton,
        IonList,
        IonCheckbox,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonBadge,
        IonMenuToggle,
        IonApp,
        IonMenu,
        IonMenuButton,
        IonIcon,
        IonButtons

    ]
})

export class AppIonicModule { }