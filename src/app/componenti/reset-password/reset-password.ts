import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { UtenteServices } from '../../services/utente-services';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {

  private readonly route = inject(ActivatedRoute)
  private readonly routing = inject(Router)
  private readonly accountServices = inject(UtenteServices)
  private readonly snackBar = inject(MatSnackBar)

  id: any;
  msg = signal("");

  ngOnInit(): void {
    this.msg.set("");
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("id:" + this.id);
  }

  onSubmit(updatePwd: NgForm) {
    this.msg.set("");

    if (updatePwd.value.newpassword != updatePwd.value.cntrlpassword) {
      this.msg.set("password non identiche.")
      return
    }
    this.accountServices.resetPassword({
      userName: this.id,
      newPwd: updatePwd.value.newpassword
    }).subscribe({
      next: ((r: any) => {
        this.snackBar.open('Password cambiata', 'Chiudi',
                    {
                        duration: 3000,
                        panelClass: ['center-snackbar']
                    }
                );
         this.routing.navigate(['dash/home'])     
                
      }),
      error: ((r: any) => {
        this.msg.set(r.error.msg);
      })
    })

  }

}
