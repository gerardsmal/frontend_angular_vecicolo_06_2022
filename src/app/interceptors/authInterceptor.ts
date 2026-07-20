import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AutentificazioneServices } from "../security/autentificazione-services";
import { AuthServices } from "../auth/auth-services";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const autentificationSercice = inject(AutentificazioneServices);
    const authSercice = inject(AuthServices);
    const token = authSercice.grant().token;


    let cloned = req.clone({
        withCredentials: true
    });

    const publicUrls = [
        '/rest/auth/login',
        '/rest/auth/refresh',
        '/public/',
        '/images/'
    ];

    const isPublic = publicUrls.some(url => req.url.includes(url))

    if (token && !isPublic) {
        console.log("insert...");
        cloned = cloned.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return next(cloned);
}