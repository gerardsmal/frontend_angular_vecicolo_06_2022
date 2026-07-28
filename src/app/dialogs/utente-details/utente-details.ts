import { Component, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { UtenteServices } from '../../services/utente-services';

@Component({
  selector: 'app-utente-details',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, FormsModule, ReactiveFormsModule,
    MatRadioModule, MatInputModule],
  templateUrl: './utente-details.html',
  styleUrl: './utente-details.css',
})
export class UtenteDetails implements OnInit{
  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<UtenteDetails>);
  private readonly accoutServices = inject(UtenteServices);
  private readonly dialog = inject(MatDialog);

  account: any;
  mod: any;
  msg = signal('');

  updateForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    sesso: new FormControl(null, Validators.required),
    telefono: new FormControl(null, Validators.required),
    via: new FormControl(null, Validators.required),
    comune: new FormControl(null, Validators.required),
    cap: new FormControl(null, Validators.required),
    userName: new FormControl(null),
    password: new FormControl(null),
    passwordControl: new FormControl(null),
    role: new FormControl(null, Validators.required),
    stato: new FormControl()
  })


  constructor() {
    if (this.data) {
      this.account = this.data.account
      this.mod = this.data.mod
    }
  }

 ngOnInit(): void {
    console.log("modalita:" + this.mod)
    if (this.mod == 'U') {
      this.updateForm.patchValue({
        nome: this.account.nome,
        cognome: this.account.cognome,
        email: this.account.email,
        sesso: this.account.sesso ? 'M' : 'F',
        telefono: this.account.telefono,
        via: this.account.via,
        comune: this.account.comune,
        cap: this.account.cap,
        userName: this.account.userName,
        role: this.account.role
      })

    } else {
      this.updateForm.patchValue({
        sesso: 'M',
        role: "USER"
      })
    }
  }

  onSubmit() {
    if (this.mod == 'U') this.onUpdate();
    if (this.mod == 'C') this.onCreate();

  }
  onUpdate() {
    if (this.updateForm.controls['password'].dirty) {
      if (this.updateForm.value.password != this.updateForm.value.passwordControl) {
        this.msg.set("passord non coindicidenti");
        return;
      }
    }
    this.msg.set('');
    const updateBody: any = { userName: this.account.userName };

    if (this.updateForm.controls['password'].dirty)
      updateBody.pwd = this.updateForm.value.password;

    if (this.updateForm.controls['nome'].dirty)
      updateBody.nome = this.updateForm.value.nome;

    if (this.updateForm.controls['cognome'].dirty)
      updateBody.cognome = this.updateForm.value.cognome;

    if (this.updateForm.controls['email'].dirty)
      updateBody.email = this.updateForm.value.email;

    if (this.updateForm.controls['sesso'].dirty)
      updateBody.sesso = this.updateForm.value.sesso == 'M' ? true : false;

    if (this.updateForm.controls['telefono'].dirty)
      updateBody.telefono = this.updateForm.value.telefono;

    if (this.updateForm.controls['via'].dirty)
      updateBody.via = this.updateForm.value.via;

    if (this.updateForm.controls['comune'].dirty)
      updateBody.commune = this.updateForm.value.comune;

    if (this.updateForm.controls['password'].dirty)
      updateBody.pwd = this.updateForm.value.password;

    if (this.updateForm.controls['cap'].dirty)
      updateBody.cap = this.updateForm.value.cap;

    if (this.updateForm.controls['role'].dirty)
      updateBody.role = this.updateForm.value.role;

    console.log(updateBody);
    console.log('updateAdmin');
    this.accoutServices.updateAdmin(updateBody)
      .subscribe({
        next: ((resp: any) => {
          console.log(resp);
          this.dialogRef.close();
        }),
        error: ((resp: any) => {
          this.msg.set(resp.error.msg);
        })
      })
  }
  onCreate() {
    this.msg.set("");

    if (this.updateForm.value.password != this.updateForm.value.passwordControl) {
      this.msg.set("passord non coindicidenti");
      return;
    }
    console.log("nome" + this.updateForm.value.nome);
    console.log("cognome" + this.updateForm.value.cognome);

    this.accoutServices.create({
      nome: this.updateForm.value.nome,
      cognome: this.updateForm.value.cognome,
      email: this.updateForm.value.email,
      sesso: this.updateForm.value.sesso == 'M' ? true : false,
      telefono: this.updateForm.value.telefono,
      via: this.updateForm.value.via,
      commune: this.updateForm.value.comune,
      cap: this.updateForm.value.cap,
      userName: this.updateForm.value.userName,
      pwd: this.updateForm.value.password,
      role: this.updateForm.value.role
    }).subscribe({
      next: ((resp: any) => {
        this.dialogRef.close();
      }),
      error: ((resp: any) => {
        console.log(resp.error.msg)
        this.msg.set(resp.error.msg);
      })
    })
  }

  remove() {
    this.accoutServices.delete(this.account.userName)
      .subscribe({
        next:((r:any) => {
          this.dialogRef.close();
        }),
        error:((r:any) => {
          this.msg.set(r.error.msg)
        })
      })
  }


}
