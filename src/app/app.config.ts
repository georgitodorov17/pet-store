import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"pet-store-9b052","appId":"1:1002969709907:web:6f72457c1f10ab1a9bf5a6","storageBucket":"pet-store-9b052.firebasestorage.app","apiKey":"AIzaSyBg8nVG1S_T0jfMWcE2S_Jcsw2mFXLwFuE","authDomain":"pet-store-9b052.firebaseapp.com","messagingSenderId":"1002969709907","measurementId":"G-EWNH9ZED9S","projectNumber":"1002969709907","version":"2"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
