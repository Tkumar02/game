import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateComponent } from './admin/create/create.component';
import { HomeComponent } from './home/home.component';
import { SimpleComponent } from './play/simple/simple.component';

// import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// import { environment } from '../environments/environment';
// import { provideFirestore,getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateComponent,
    HomeComponent,
    SimpleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    //provideFirebaseApp(() => initializeApp(environment.firebase)), provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
