import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateComponent } from './admin/create/create.component';
import { HomeComponent } from './home/home.component';
import { SimpleComponent } from './play/simple/simple.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
