import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';
import { LoginDTO, LoginReq, MeDTO } from '../models/dto';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthServices } from '../auth/auth-services';

@Service()
export class AutentificazioneServices {
    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);
    private readonly authServices = inject(AuthServices);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'auth/';
    }
    login(body: LoginReq): Observable<MeDTO> {
        return this.http.post<LoginDTO>(this.getBaseUrl() + "login", body, { withCredentials: true })
            .pipe(
                tap(resp => {
                    this.authServices.setToken(resp.accessToken);
                }),
                switchMap(() => this.me()),
            );
    }
    me(): Observable<MeDTO> {
        return this.http.get<MeDTO>(this.getBaseUrl() + "me").pipe(
            tap(user => this.authServices.setAutentificated(user))
        );
    }




}
