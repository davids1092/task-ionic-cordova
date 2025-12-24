# Proyecto Ionic + Cordova

Este proyecto está desarrollado con **Ionic + Angular** y **Cordova** para Android.  
Estas son las instrucciones para correrlo en un emulador o generar el APK.

---

# descargar repositorio
git clone https://github.com/davids1092/task-ionic-cordova.git
cd ionic-task-cordova
npm install

## Requisitos

- Node.js >= 16
- NPM >= 8
- Ionic CLI 7.2.1

# compilar proyecto web (local)
ionic serve
  
# compilar proyecto y levantar en emulador (Andoid)
npm install -g native-run
cordova platform add Android
ionic build
cordova run android --emulator

# generar apk
cordova build android --release (salida apk : platforms/android/app/build/outputs/apk/debug/app-debug.apk)

