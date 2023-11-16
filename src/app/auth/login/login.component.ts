import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: LoginService){}
  ngOnInit(): void{}

  onSubmit(form:any){
    console.log(form)
    this.auth.login(form.email,form.password)
  }
}
