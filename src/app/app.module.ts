import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, provideFirebaseApp(() => initializeApp({"projectId":"book-app-fon-nmr","appId":"1:335341581510:web:79fbaa7e0b979a8a32d3c7","databaseURL":"https://book-app-fon-nmr-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"book-app-fon-nmr.appspot.com","apiKey":"AIzaSyApoYFL0h_MMmn_pgyD2fDyVlIn8EWm4hY","authDomain":"book-app-fon-nmr.firebaseapp.com","messagingSenderId":"335341581510"})), provideStorage(() => getStorage())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
