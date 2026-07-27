import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from "@angular/common";
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthServices } from '../../auth/auth-services';
import { CarelloServices } from '../../services/carello-services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carello',
  imports: [MatCardModule, MatButtonModule, CurrencyPipe, MatDividerModule, MatIconModule],
  templateUrl: './carello.html',
  styleUrl: './carello.css',
})
export class Carello implements OnInit {

  private readonly auth= inject(AuthServices);
  private readonly carelloServices = inject(CarelloServices);
  private readonly routing = inject(Router);


  carello = signal<any | null>(null);
  msg = signal('');

  ngOnInit(): void {
    this.getCarello()
  }
  onSelectedProduct(riga: any) {

  }

  onChangeQuantita(riga: any, quantita: any) {
    console.log("change qta:" + quantita);
    this.msg.set('');
    this.carelloServices.updateRiga({
      id: riga.id,
      quantita: quantita
    }).subscribe({
      next: ((r: any) => {
        this.getCarello()
      }),
      error: ((r: any) => {
        this.msg.set(r.error.msg)
      })
    })
  }

  onDelete(id: number) {
    this.carelloServices.deleteRiga(id)
      .subscribe({
        next: (r => {
          this.auth.setCarelloSize(this.auth.grant().carelloSize - 1)
          if (this.auth.grant().carelloSize == 0)
            this.routing.navigate(["/dash/home"])
          else
            this.getCarello()
        })

      })
  }

  onOrdine() {

  }
  private getCarello() {
    this.carelloServices.list()
      .subscribe({
        next: ((r: any) => {
          this.carello.set(r)
        }),
        error: ((r: any) => {
          console.log("Errore caricamento account:", r.error);
        })
      })

  }


}
