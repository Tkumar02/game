import { Component, NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './admin/create/create.component';
import { HomeComponent } from './home/home.component';
import { SimpleComponent } from './play/simple/simple.component';
import { ChallengeComponent } from './play/challenge/challenge.component';

const routes: Routes = [
  {path:'admin/create', component:CreateComponent},
  {path: 'home', component: HomeComponent},
  {path: 'play/simple', component:SimpleComponent},
  {path: 'play/challenge', component:ChallengeComponent},
  {path: '', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
