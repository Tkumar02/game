import { Component } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userEmail:string = '';
  hideLogin: boolean = false;

  constructor(private auth:LoginService){}
  ngOnInit(): void{
    this.auth.loadUser();

    this.auth.email$.subscribe((user:string)=>{
      this.userEmail = user
      if(this.userEmail){
        this.hideLogin = true
      }
    })
  }

  onLogOut(){
    this.auth.logOut()
    this.userEmail = '';
    this.hideLogin = false;
  }
}
