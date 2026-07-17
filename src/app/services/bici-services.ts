import { inject, Service } from '@angular/core';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';
import { HttpClient } from '@angular/common/http';
import { VeicoliServices } from './veicoli-services';
import { tap } from 'rxjs';

@Service()
export class BiciServices {
    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);
    private veicoliServices = inject(VeicoliServices);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'bici/';
    }

    create(body: {}) {
        return this.http.post(this.getBaseUrl() + "admin/create", body)
            .pipe(tap(() => this.veicoliServices.list()))
    }

    update(body: {}) {
        return this.http.patch(this.getBaseUrl() + "admin/update", body)
            .pipe(tap(() => this.veicoliServices.list()))
    }

}
