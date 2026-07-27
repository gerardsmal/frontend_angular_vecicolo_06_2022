import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthServices } from '../../auth/auth-services';
import { UtilitiesServices } from '../../services/utilities-services';
import { CarelloServices } from '../../services/carello-services';
import { CarelloFacadeService } from '../../services/carello-facade-service';



@Component({
  selector: 'app-moto-pre-carello',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatCardModule, CurrencyPipe],
  templateUrl: './moto-pre-carello.html',
  styleUrl: './moto-pre-carello.css',
})
export class MotoPreCarello {

  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<MotoPreCarello>);
  private readonly dialog = inject(MatDialog);
  private readonly auth = inject(AuthServices);
  private readonly util = inject(UtilitiesServices);
  private readonly carelloServices = inject(CarelloServices);
  private readonly snackBar = inject(MatSnackBar);
  private readonly carelloFacade = inject (CarelloFacadeService);

  veicolo: any;
  msg = signal('');

  constructor() {
    if (this.data) {
      this.veicolo = this.data.veicolo;
      this.msg.set("");
    }
  }
  aggiungiCarello() {
    this.carelloFacade.aggiungiVeicoloCarello(this.veicolo.id)
      .subscribe({
        next:(() => {
          this.dialogRef.close();
        }),
        error:((r:any) => {
          this.msg.set(r.error.msg);
        })
      })
  }

}
