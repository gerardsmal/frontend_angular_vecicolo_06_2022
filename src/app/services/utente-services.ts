import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';

@Service()
export class UtenteServices {
    accounts = signal<any[]>([]);

    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'utente/';
    }

    list(userName?: string, nome?: string, cognome?: string, role?: string) {
        let params = new HttpParams();
        if (nome) params = params.set('nome', nome);
        if (cognome) params = params.set('cognome', cognome);
        if (role) params = params.set('role', role);


        this.http.get(this.getBaseUrl() + "admin/list", { params })
            .subscribe({
                next: ((r: any) => this.accounts.set(r)),
            })
    }

    create(body: {}) {
        return this.http.post(this.getBaseUrl() + "public/create", body)
            .pipe(tap(() => this.list()));
    }
    updateAdmin(body: {}) {
        console.log("execute updateAdmin")
        return this.http.patch(this.getBaseUrl() + "admin/updateAdmin", body)
            .pipe(tap(() => this.list()));
    }
    updateProfile(body: {}) {
        return this.http.patch(this.getBaseUrl() + "user/update", body);
    }

    delete(id: number) {
        return this.http.delete(this.getBaseUrl() + "admin/delete/" + id)
            .pipe(tap(() => this.list()));
    }

    findByUserName(id?: string) {
        return this.http.get(this.getBaseUrl() + "user/getById");
    }

    changePwd(body: {}) {
        return this.http.put(this.getBaseUrl() + "user/changePwd", body);
    }

    sendResetPassword(userName: any) {
        let params = new HttpParams().set("userName", userName)
        return this.http.get(this.getBaseUrl() + "public/sendResetPassword", { params })
    }
    
    resetPassword(body: {}) {
        return this.http.patch(this.getBaseUrl() + "public/resetPassword", body);
    }

}
