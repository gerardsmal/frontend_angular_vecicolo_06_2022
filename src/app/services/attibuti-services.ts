import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';

@Service()
export class AttibutiServices {

    private readonly settings: AppSettings = inject(APP_SETTING);
    private http = inject(HttpClient);

    tipoVeicoli = signal<any[]>([]);
    coloreList = signal<any[]>([]);
    marcaList = signal<any[]>([]);

    getBaseUrl(): string {
        return this.settings.apiUrl;
    }
    listTipoVeicolo() {
        return this.http.get(this.getBaseUrl() + "tipoVeicolo/public/list")
            .subscribe({
                next: ((r: any) => this.tipoVeicoli.set(r))
            })
    }
    listColore() {
        return this.http.get(this.getBaseUrl() + "colore/public/list")
            .subscribe({
                next: ((r: any) => this.coloreList.set(r))
            })
    }

    listMarca() {
        return this.http.get(this.getBaseUrl() + "marca/public/list")
            .subscribe({
                next: ((r: any) => this.marcaList.set(r))
            })
    }


    listCategoria(pattern: string) {
        const params = new HttpParams().set("pattern", pattern);
        return this.http.get(this.getBaseUrl() + "categorie/public/list", { params })
    }

    listAlim(pattern: string) {
        const params = new HttpParams().set("pattern", pattern);
        return this.http.get(this.getBaseUrl() + "alimentazione/public/list", { params })
    }
}
