import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user= new BehaviorSubject<string>('');
  email$ = this.user.asObservable();
  isLoggedInGuard:boolean = false;

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private afa: AngularFireAuth, private router:Router) {}

  login(email:string, password:string){
    this.afa.signInWithEmailAndPassword(email, password).then(logRef=>{
      console.log('successfully logged in')
      this.loadUser()
      this.isLoggedInGuard = true;
      this.router.navigate(['/view-data'])
      this.loggedIn.next(true);
      
    }).catch(e=>{
      console.log(e)
    })
  }

  loadUser(){
    this.afa.authState.subscribe(data=>{
      if(data?.email){
        this.user.next(data.email)
      }
    })
  }

  logOut(){
    this.afa.signOut().then(()=>{
      console.log('successfully logged out')
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
    })
  }
}
