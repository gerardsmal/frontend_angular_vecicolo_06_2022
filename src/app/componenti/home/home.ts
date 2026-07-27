import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from "@angular/common";
import { AttibutiServices } from '../../services/attibuti-services';
import { VeicoliServices } from '../../services/veicoli-services';
import { UtilitiesServices } from '../../services/utilities-services';
import { ComponentType } from '@angular/cdk/overlay';
import { MacchinaPreCarello } from '../../dialogs/macchina-pre-carello/macchina-pre-carello';
@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatDividerModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatIconModule,
    MatTooltipModule, MatButtonModule, CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private readonly attributiS = inject(AttibutiServices);
  private readonly veivoliS = inject(VeicoliServices);
  private readonly util = inject(UtilitiesServices);


  tipo: any = null;
  categ: any = null;
  alim: any = null;
  colore: any = null;
  marca: any = null;

  categories: any;
  alimentazione: any;

  ngOnInit(): void {
    this.attributiS.listTipoVeicolo();
    this.attributiS.listColore();
    this.attributiS.listMarca();
    this.veivoliS.page();
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

  get paging() {
    return this.veivoliS.paging();
  }

  get marcaList() {
    return this.attributiS.marcaList();
  }

  prevPage() {
    let tipoId = this.tipo == null ? null : this.tipo.id;
    let pageNumber = this.paging.page = this.paging.page - 1;
    this.veivoliS.page(pageNumber, null, null, null, tipoId, this.categ, this.alim, this.colore, this.marca);

  }

  nextPage() {
    let tipoId = this.tipo == null ? null : this.tipo.id;
    let pageNumber = this.paging.page = this.paging.page + 1;
    this.veivoliS.page(pageNumber, null, null, null, tipoId, this.categ, this.alim, this.colore, this.marca);
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
  search() {
    let tipoId = this.tipo == null ? null : this.tipo.id;
    console.log("filtri:" + tipoId + "/" + this.categ + "/" + this.alim + "/" + this.colore + "/" + this.marca)
    this.veivoliS.page(null, null, null, null, tipoId, this.categ, this.alim, this.colore, this.marca);

  }
  selectProd(vei: any) {
  console.log("detaglio veicolo :" + vei.id);
    let dialogComponent: ComponentType<any>
    if (vei.tipoVeicolo.nome === 'macchina') dialogComponent = MacchinaPreCarello;
   // if (vei.tipoVeicolo.nome === 'moto') dialogComponent = DettaglioMotoManager;
   
let dialogRef = this.util.openDialog(dialogComponent,
      {
        veicolo: vei
      },
      {
        width: '1100px',
        maxWidth: '90vw',
        height: 'auto',
        maxHeight: '90v',
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms'
      },
    )
  }


  

}
