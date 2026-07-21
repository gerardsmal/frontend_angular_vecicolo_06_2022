import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { MeDTO } from '../models/dto';
import { AutentificazioneServices } from '../security/autentificazione-services';

@Service()
export class AuthServices {

    grant = signal({
        token: null,
        isAdmin: false,
        isLogged: false,
        userId: null as string | null,
    })

    setToken(token: string) {
        this.grant.update(grant => ({
            ...grant,     // copia tutte le proprieta di grant
            token: token
        }));

    }

    setAutentificated(user: MeDTO) {
        let admin = user.role === 'ADMIN' ? true : false;

        this.grant.update(grant => ({
            ...grant,     // copia tutte le proprieta di grant
            isLogged: true,
            isAdmin: admin,
            userId: user.id,
        }));

    }


    resetAll() {
        this.grant.set({
            token: null,
            isAdmin: false,
            isLogged: false,
            userId: null,
        });
    }

    isAutentificated(): boolean {
        return this.grant().isLogged;
    }

    isRoleAdmin() {
        return this.grant().isAdmin;
    }

}
