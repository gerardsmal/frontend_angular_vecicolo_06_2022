import { Component, signal, ViewChild } from '@angular/core';
import { NgForm, FormsModule, NgModel } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/input";
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UtenteServices } from '../../services/utente-services';
import { AuthServices } from '../../auth/auth-services';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormField, MatLabel, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  msg = signal("");
  @ViewChild('loginForm') loginForm: NgModel;

  constructor(
    private routing: Router,
    private utenteServices: UtenteServices,
    private auth:AuthServices
  ) { }

 onSubmit(){
    this.utenteServices.login({
      userName:this.loginForm.value.userName,
      pwd:this.loginForm.value.password
    }).subscribe({
      next:((r:any) => {
        this.msg.set("");
        console.log(r);
        
        this.auth.setAutentificated()
        if (r.role === 'ADMIN')
          this.auth.setAdmin()
        else
          this.auth.setUser()
        
        this.routing.navigate(['dash']);
      }),
      error:((r:any) => {
        this.msg.set(r.error.msg);
      })
    })
  }
}

