import { inject, Service } from '@angular/core';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';
import { HttpClient } from '@angular/common/http';
import { carelloReq } from '../models/dto-input';

@Service()
export class CarelloServices {
    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'carello/';
    }

    list() {
        return this.http.get(this.getBaseUrl() + "user/list")
    }

    addRiga(body: carelloReq) {
        return this.http.post(this.getBaseUrl() + "user/addRiga", body);
    }
    
    updateRiga(body: carelloReq) {
        return this.http.patch(this.getBaseUrl() + "user/updateRiga", body);
    }
    deleteRiga(id: number) {
        return this.http.delete(this.getBaseUrl() + "user/deleteRiga/" + id);
    }
}
