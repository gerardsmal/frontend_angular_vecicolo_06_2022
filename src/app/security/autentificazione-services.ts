import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';
import { LoginDTO, LoginReq, MeDTO } from '../models/dto';
import { catchError, finalize, map, Observable, of, shareReplay, switchMap, tap, throwError } from 'rxjs';
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
    logout(){
        return this.http.post(this.getBaseUrl() + 'logout', {}, { withCredentials: true })
    }
    /*
    * Contiene la richiesta di refresh in corso.
    *
    * Serve a evitare che n richieste HTTP fallite contemporaneamente
    * provochino n chiamate differenti a /refresh.
    */
    private refreshRequest$: Observable<LoginDTO> | null = null;


    refreshToken(): Observable<LoginDTO> {

        if (this.refreshRequest$) {  // in cas of refresh laready running
            return this.refreshRequest$;
        }

        this.refreshRequest$ = this.http.post<LoginDTO>(this.getBaseUrl() + "refresh", {}, { withCredentials: true })
            .pipe(
                tap(resp => { this.authServices.setToken(resp.accessToken) }),
                catchError(error => {  // in case of error
                    this.authServices.resetAll();
                    return throwError(() => error);
                }),
                finalize(() => { // end of process
                    this.refreshRequest$ = null;
                }),
                shareReplay({ // share response with all request running at same time
                    bufferSize: 1,
                    refCount: false
                })
            )

        return this.refreshRequest$;
    }

    restoreSession(): Observable<boolean> {

        return this.refreshToken().pipe(
            switchMap(() =>
                this.me()
            ),
            tap(user => {
                this.authServices.setAutentificated(user);
            }),
            map(() => true),
            catchError(() => {
                this.authServices.resetAll();
                return of(false);
            })
        );
    }

}
