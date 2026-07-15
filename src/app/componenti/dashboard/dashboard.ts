import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthServices } from '../../auth/auth-services';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, MatListModule, RouterLink, RouterOutlet, RouterLinkActive, MatIconModule,
    MatButtonModule, MatToolbarModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(
    public auth: AuthServices,
    private rounting: Router
  ) {}

  login() {
    this.rounting.navigate(['/login'])
  }
  logout() {
    console.log("logout");
    this.auth.resetAll();
    this.rounting.navigate(['/dash'])
  }
}
