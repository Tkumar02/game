import { Component, NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './admin/create/create.component';
import { HomeComponent } from './home/home.component';
import { SimpleComponent } from './play/simple/simple.component';
import { ChallengeComponent } from './play/challenge/challenge.component';
import { CreateGroupComponent } from './ss/create-group/create-group.component';
import { SelectionComponent } from './ss/selection/selection.component';
import { LoginComponent } from './auth/login/login.component';
import { ViewDataComponent } from './admin/view-data/view-data.component';
import { GuardGuard } from './services/auth/guard.guard';

const routes: Routes = [
  {path:'admin/create', component:CreateComponent},
  {path: 'home', component: HomeComponent},
  {path: 'play/simple', component:SimpleComponent},
  {path: 'play/challenge', component:ChallengeComponent},
  {path: 'ss/create-group', component:CreateGroupComponent},
  {path: 'ss/selection', component:SelectionComponent},
  {path: 'login', component:LoginComponent},
  {path: 'view-data', component:ViewDataComponent, canActivate:[GuardGuard]},
  {path: '', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
