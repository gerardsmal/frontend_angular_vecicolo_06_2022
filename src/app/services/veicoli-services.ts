import { inject, Service, signal } from '@angular/core';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';
import { HttpClient, HttpParams } from '@angular/common/http';

@Service()
export class VeicoliServices {

    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);

    veicoli = signal<any[]>([]);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'veicolo/';
    }

    list(tipo?: number, categoria?: string, alimentazione?: string, colore?: number, marca?: number) {
        let params = new HttpParams();
        if (tipo) params = params.set('tipo', tipo);
        if (categoria) params = params.set('categoria', categoria);
        if (alimentazione) params = params.set('alimentazione', alimentazione);
        if (colore) params = params.set('colore', colore);
        if (marca) params = params.set('marca', marca);
        this.http.get(this.getBaseUrl() + "public/list", { params })
            .subscribe({
                next: ((r: any) => this.veicoli.set(r)),
            })
    }

  
}
