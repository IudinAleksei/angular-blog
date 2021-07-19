import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  constructor(private authSvc: AuthService, private router: Router) {}

  logout(event: Event): void {
    event.preventDefault();
    this.authSvc.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
