import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthenticationService } from '../../features/authentication/authentication.service';

@UntilDestroy()
@Component({
  selector: 'domain-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  constructor(public authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }
}
