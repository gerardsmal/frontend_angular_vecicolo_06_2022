import { inject, Service } from '@angular/core';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VeicoliServices } from './veicoli-services';
import { tap } from 'rxjs';

@Service()
export class UploadServices {
    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);
    private readonly veicoliServices = inject(VeicoliServices);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'upload/';
    }
    upload(file: File, id: any) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        return this.http.post(this.getBaseUrl() + "admin/image", formData)
            .pipe(tap(() => this.veicoliServices.list()))
    }
    getUrl(name: string) {
        let params = new HttpParams().set("filename", name);
        return this.http.get(this.getBaseUrl() + "admin/getUrl", { params });
    }

}
