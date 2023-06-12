import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet> 
    <p-toast position="top-right"></p-toast>
        <p-confirmDialog header="Xác nhận" acceptLabel="Có" rejectLabel="Không" icon="pi pi-exclamation-triangle"></p-confirmDialog>
  `,
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.primengConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';
    if (this.authService.isAuthenticated() == false) {
      this.router.navigate(['/auth/login'])
    }
  }
}
