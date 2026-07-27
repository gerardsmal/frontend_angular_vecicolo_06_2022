import { inject, Service } from '@angular/core';
import { AuthServices } from '../auth/auth-services';
import { UtilitiesServices } from './utilities-services';
import { CarelloServices } from './carello-services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { Login } from '../dialogs/login/login';

@Service()
export class CarelloFacadeService {
    private readonly auth = inject(AuthServices);
    private readonly util = inject(UtilitiesServices);
    private readonly carelloServices = inject(CarelloServices);
    private readonly snackBar = inject(MatSnackBar);


    aggiungiVeicoloCarello(veicoloId: number): Observable<unknown> {
        return this.controllaAutenticazione().pipe(
            switchMap(() =>
                this.carelloServices.addRiga({
                    veicoloID: veicoloId,
                    quantita: 1
                })
            ),
            tap(() => {
                this.auth.setCarelloSize(
                    this.auth.grant().carelloSize + 1
                );
                this.snackBar.open('Articolo aggiunto al carrello', 'Chiudi',
                    {
                        duration: 3000,
                        panelClass: ['center-snackbar']
                    }
                );
            })
        );
    }
    /*
    *  control uetente logged
    */
    private controllaAutenticazione(): Observable<unknown> {
        if (this.auth.isAutentificated()) {
            return new Observable(observer => {
                observer.next(true);  // set return code to true
                observer.complete();
            });
        }
        const dialogLoginRef = this.util.openDialog(Login, {},
            {
                width: '500px'
            }
        );
        return dialogLoginRef.afterClosed().pipe(
            switchMap(risultato => risultato ? [risultato] : EMPTY)  // send rc or empty 
        );
    }
}

