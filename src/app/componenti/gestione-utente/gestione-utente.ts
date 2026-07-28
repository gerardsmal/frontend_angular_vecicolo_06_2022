import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UtenteServices } from '../../services/utente-services';
import { UtilitiesServices } from '../../services/utilities-services';
import { UtenteDetails } from '../../dialogs/utente-details/utente-details';

@Component({
  selector: 'app-gestione-utente',
  imports: [MatCardModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatSelectModule, MatButtonModule, FormsModule],
  templateUrl: './gestione-utente.html',
  styleUrl: './gestione-utente.css',
})
export class GestioneUtente implements OnInit {

  private readonly accountServices = inject(UtenteServices);
  private readonly util = inject(UtilitiesServices);
  private readonly dialog = inject(MatDialog);


  userName: any = null;
  nome: any = null;
  cognome: any = null;
  role: any = null;

  get accounts() {
    return this.accountServices.accounts();
  }

  ngOnInit(): void {
    this.accountServices.list();
  }
  search() {
    if (this.role == 'Role') this.role = null;
    console.log(this.nome + "/" + this.cognome + "/" + this.role);
    this.accountServices.list(this.userName, this.nome, this.cognome, this.role);
  }

  create() {
    this.callDialog(null, "C");
  }
  onSelectedAccount(acc: any) {
    this.callDialog(acc, "U");
  }

  private callDialog(acc: any, mod: any) {
       
    let dialogRef = this.util.openDialog(UtenteDetails,
      {
        mod: mod,
        account: acc
      },
      {
        width: '90vw',
        maxWidth: '1200px',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms'
      },
    )
    
  }

}
