import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VeicoliServices } from '../../services/veicoli-services';
import { UtilitiesServices } from '../../services/utilities-services';
import { AttibutiServices } from '../../services/attibuti-services';
import { SceltaUpdate } from '../../dialogs/scelta-update/scelta-update';
import { Upload } from '../../dialogs/upload/upload';
import { ComponentType } from '@angular/cdk/overlay';
import { MacchinaDetails } from '../../dialogs/macchina-details/macchina-details';
import { MotoDetails } from '../../dialogs/moto-details/moto-details';

@Component({
  selector: 'app-gestione-veicoli',
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, FormsModule, MatDividerModule, MatButtonModule,
    MatIconModule
  ],
  templateUrl: './gestione-veicoli.html',
  styleUrl: './gestione-veicoli.css',
})
export class GestioneVeicoli implements OnInit {
  private readonly veivoliS = inject(VeicoliServices);
  private readonly util = inject(UtilitiesServices);
  private readonly attributiS = inject(AttibutiServices);


  tipo: any = null;
  categ: any = null;
  alim: any = null;
  colore: any = null;
  marca: any = null;

  categories: any;
  alimentazione: any;

  tipoCreate: any = null;


  ngOnInit(): void {
    this.attributiS.listTipoVeicolo();
    this.attributiS.listColore();
    this.attributiS.listMarca();
    this.veivoliS.list();
  }

  get tipoVeicoli() {
    return this.attributiS.tipoVeicoli();
  }

  get coloreList() {
    return this.attributiS.coloreList();
  }

  get veicoli() {
    return this.veivoliS.veicoli();
  }

  get marcaList() {
    return this.attributiS.marcaList();
  }

  search() {
    let tipoId = this.tipo == null ? null : this.tipo.id;
    console.log("filtri:" + tipoId + "/" + this.categ + "/" + this.alim + "/" + this.colore + "/" + this.marca)
    this.veivoliS.list(tipoId, this.categ, this.alim, this.colore, this.marca);
  }

  onTipoChange(tipoSelect: any) {
    console.log("pattern selezionato:", tipoSelect.pattern);
    if (tipoSelect.id != null) {
      this.attributiS.listCategoria(tipoSelect.pattern)
        .subscribe({
          next: ((r: any) => {
            this.categories = r;
            console.log(r);
          }),
          error: ((r: any) => {
            console.log(r.error.msg);
          })
        });

      this.attributiS.listAlim(tipoSelect.pattern)
        .subscribe({
          next: ((r: any) => {
            this.alimentazione = r;
            console.log(r);
          }),
          error: ((r: any) => {
            console.log(r.error.msg);
          })
        });
      this.search();
    }
  }

  onCreateVeicolo() {
    let dialogComponent: ComponentType<any>
    if (this.tipoCreate.nome === 'macchina') dialogComponent = MacchinaDetails;
    if (this.tipoCreate.nome === 'moto') dialogComponent = MotoDetails;

    let dialogRef = this.util.openDialog(dialogComponent,
      {
        mod: 'C',
        tipoVeicolo: this.tipoCreate,
        veicolo: null
      },
      {
        width: '1100px',
        maxWidth: '90vw',
        height: 'auto',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms'
      },
    )
  }

  onSelected(row: any) {
    console.log(row);
    let dialogRef = this.util.openDialog(SceltaUpdate, null, {
      width: '400px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '100v'
    });
    dialogRef.afterClosed()
      .subscribe(r => {
        if (r == 'upload') {
          this.eseguoUpload(row);
        } else if (r == 'update') {
          this.eseguoUpdate(row);
        }
      })
  }

  eseguoUpload(row: any) {
    console.log("eseguo l'upload");
    this.util.openDialog(Upload,
      {
        veicolo: row
      }
    )
  }

  eseguoUpdate(row: any) {
    console.log("eseguo l'update tipo veicolo:" + row.tipoVeicolo.nome);
    let dialogComponent: ComponentType<any>
    if (row.tipoVeicolo.nome === 'macchina') dialogComponent = MacchinaDetails;
    if (row.tipoVeicolo.nome === 'moto') dialogComponent = MotoDetails;


    let dialogRef = this.util.openDialog(dialogComponent,
      {
        mod: 'U',
        tipoVeicolo: row.tipoVeicolo,
        veicolo: row
      },
      {
        width: '1100px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        panelClass: 'wide-dialog',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms'
      },
    )

  }
}
