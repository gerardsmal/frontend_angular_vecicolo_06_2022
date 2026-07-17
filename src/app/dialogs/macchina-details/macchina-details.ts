import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MacchinaServices } from '../../services/macchina-services';
import { AttibutiServices } from '../../services/attibuti-services';


@Component({
  selector: 'app-macchina-details',
  imports: [MatButtonModule, MatIconModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule],
  templateUrl: './macchina-details.html',
  styleUrl: './macchina-details.css',
})
export class MacchinaDetails implements OnInit {

  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<MacchinaDetails>);
  private readonly attributiS = inject(AttibutiServices);
  private readonly macchinaS = inject(MacchinaServices);


  mod: any = signal("");
  macchina: any = signal<any>(null);
  readonly dialog = inject(MatDialog);

  tipoVeicolo: any;
  tipoAlimentazione = signal<any[]>([]);;
  categories = signal<any[]>([]);
  msg = signal("")

  updateForm: FormGroup = new FormGroup({
    modello: new FormControl(null, Validators.required),
    categ: new FormControl(null, Validators.required),
    alim: new FormControl(null, Validators.required),
    colore: new FormControl(null, Validators.required),
    marca: new FormControl(null, Validators.required),
    ruote: new FormControl(4, Validators.required),
    porte: new FormControl(5, Validators.required),
    targa: new FormControl(null, Validators.required),
    anno: new FormControl(null, Validators.required),
    cc: new FormControl(null, Validators.required),
    prezzo: new FormControl(null, Validators.required)

  })

  constructor() {
    if (this.data) {
      this.tipoVeicolo = this.data.tipoVeicolo;
      this.mod.set(this.data.mod);
      this.macchina.set(this.data.veicolo);
      console.log(this.tipoVeicolo);
    }
  }

  ngOnInit(): void {
    this.attributiS.listCategoria(this.tipoVeicolo.pattern)
      .subscribe({
        next: ((r: any) => {
          this.categories.set(r);
        }),
        error: ((r: any) => {
          console.log(r.error.msg);
        })
      });
    this.attributiS.listAlim(this.tipoVeicolo.pattern)
      .subscribe({
        next: ((r: any) => {
          this.tipoAlimentazione.set(r);
        }),
        error: ((r: any) => {
          console.log(r.error.msg);
        })
      });
    this.attributiS.listColore();
    this.attributiS.listMarca();
    if (this.mod() == 'U') {
      this.updateForm.patchValue({
        modello: this.macchina().modello,
        categ: this.macchina().categoria.id,
        alim: this.macchina().tipoAlimentazione.id,
        colore: this.macchina().colore.id,
        marca: this.macchina().marca.id,
        ruote: this.macchina().numeroRuote,
        porte: this.macchina().macchina.numeroPorte,
        targa: this.macchina().macchina.targa,
        anno: this.macchina().annoProduzione,
        cc: this.macchina().macchina.cc,
        prezzo: this.macchina().prezzo
      })
    }
  }

  get coloreList() {
    return this.attributiS.coloreList();
  }

  get marcaList() {
    return this.attributiS.marcaList();
  }
  onSubmit() {
    if (this.mod() == 'U') this.onUpdate();
    if (this.mod() == 'C') this.onCreate();
  }

  onCreate() {
    this.macchinaS.create({
      numeroRuote: this.updateForm.value.ruote,
      modello: this.updateForm.value.modello,
      annoProduzione: this.updateForm.value.anno,
      tipoVeicolo: this.tipoVeicolo.id,
      categorie: this.updateForm.value.categ,
      tipoAlimentazione: this.updateForm.value.alim,
      colore: this.updateForm.value.colore,
      marca: this.updateForm.value.marca,
      prezzo: this.updateForm.value.prezzo,
      numeroPorte: this.updateForm.value.porte,
      targa: this.updateForm.value.targa,

      cc: this.updateForm.value.cc
    }).subscribe({
      next: ((r: any) => {
        this.dialogRef.close()

      }),
      error: ((r: any) => {
        this.msg.set(r.error.msg)
      })
    })

  }

  onUpdate() {
    const updateBody: any = { id: this.macchina().id }
    if (this.updateForm.controls['ruote'].dirty)
      updateBody.numeroRuote = this.updateForm.value.ruote;
    if (this.updateForm.controls['modello'].dirty)
      updateBody.modello = this.updateForm.value.modello;
    if (this.updateForm.controls['anno'].dirty)
      updateBody.annoProduzione = this.updateForm.value.anno;
    if (this.updateForm.controls['categ'].dirty)
      updateBody.categorie = this.updateForm.value.categ;
    if (this.updateForm.controls['alim'].dirty)
      updateBody.tipoAlimentazione = this.updateForm.value.alim;
    if (this.updateForm.controls['colore'].dirty)
      updateBody.colore = this.updateForm.value.colore;
    if (this.updateForm.controls['colore'].dirty)
      updateBody.colore = this.updateForm.value.colore;
    if (this.updateForm.controls['marca'].dirty)
      updateBody.marca = this.updateForm.value.marca;
    if (this.updateForm.controls['prezzo'].dirty)
      updateBody.prezzo = this.updateForm.value.prezzo;
    if (this.updateForm.controls['porte'].dirty)
      updateBody.numeroPorte = this.updateForm.value.porte;
    if (this.updateForm.controls['targa'].dirty)
      updateBody.targa = this.updateForm.value.targa;

    this.macchinaS.update(updateBody)
      .subscribe({
        next: ((r: any) => {
          this.dialogRef.close()
        }),
        error: ((r: any) => {
          this.msg.set(r.error.msg)
        })
      })

  }
  remove() {
  }
}
