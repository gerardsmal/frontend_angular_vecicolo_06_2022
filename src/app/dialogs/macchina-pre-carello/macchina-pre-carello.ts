import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServices } from '../../auth/auth-services';
import { UtilitiesServices } from '../../services/utilities-services';
@Component({
  selector: 'app-macchina-pre-carello',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, CurrencyPipe],
  templateUrl: './macchina-pre-carello.html',
  styleUrl: './macchina-pre-carello.css',
})
export class MacchinaPreCarello {

  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<MacchinaPreCarello>);
  private readonly dialog = inject(MatDialog);
  private readonly auth = inject(AuthServices);
  private readonly util = inject(UtilitiesServices);

veicolo: any;
  msg = signal('');


  constructor(){
     if (this.data) {
      this.veicolo = this.data.veicolo;
      this.msg.set("");
    }
  }

   aggiungiCarello() {
    
   }
}
