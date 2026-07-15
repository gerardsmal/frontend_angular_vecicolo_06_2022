import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Service, signal } from '@angular/core';

@Service()
export class AuthServices {
    private platformId = inject((PLATFORM_ID));
    grant = signal({
        isAdmin: false,
        isLogged: false,
        isMenu:false
    })

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            console.log("restore ----");
            const isLogged = localStorage.getItem("isLogged") == "1";
            const isAdmin = localStorage.getItem("isAdmin") == "1";
            this.grant.set({
                isAdmin,
                isLogged,
                isMenu:false
            })
        }
    }

    setAutentificated() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem("isLogged", "1")
            this.grant.set({
                isAdmin: false,
                isLogged: true,
                isMenu : true
            })
        }
    }

    setAdmin() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem("isAdmin", "1")
            this.grant.update(grant => ({
                ...grant,     // copia tutte le proprieta di grant
                isAdmin: true
            }));
        }
    }

    setUser() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem("isAdmin", "0")
            this.grant.update(grant => ({
                ...grant,     // copia tutte le proprieta di grant
                isAdmin: false
            }));
        }

    }

    resetAll() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem("isLogged")
            localStorage.removeItem("isAdmin")
            this.grant.set({
                isAdmin: false,
                isLogged: false,
                isMenu : false
            })
        }
    }


    isAutentificated() {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem("isLogged") === '1'
        }
        return false;
    }
    isRoleAdmin() {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem("isAdmin") === '1'
        }
        return false;
    }

}
