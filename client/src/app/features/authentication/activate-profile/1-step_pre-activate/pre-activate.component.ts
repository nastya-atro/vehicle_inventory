import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-pre-activate',
  templateUrl: './pre-activate.component.html',
  styleUrls: ['./pre-activate.component.scss'],
})
export class PreActivateComponent implements OnInit {
  email: null | string = null;
  phone: null | string = null;
  error = false;
  token = '';
  constructor(private router: Router, private service: AuthenticationService) {
    if (window.history.state) {
      this.email = window.history.state.email;
      this.phone = window.history.state.phone;
    }
  }

  ngOnInit(): void {
    this.token = this.router.parseUrl(this.router.url).queryParams['token'];
    this.service.getUserInfo(this.token).subscribe({
      next: res => {
        this.email = res.email;
        this.phone = res.phone;
      },
      error: () => {
        this.router.navigateByUrl(`/signin`);
        this.error = true;
      },
    });
  }

  sendConfirmEmailToken() {
    this.service.sendConfirmEmailToken(this.token).subscribe({
      next: () => {
        this.router.navigateByUrl(`/confirm-email`, {
          state: { email: this.email },
        });
      },
      error: () => {
        this.error = true;
      },
    });
  }

  activateProfileWithoutValidate() {
    this.service.developActivateProfile(this.token).subscribe({
      next: () => {
        this.router.navigateByUrl(`/activating`);
      },
      error: () => {
        this.error = true;
      },
    });
  }

  // sendPhoneCode() {
  //   this.service.sendPhoneCode(this.token).subscribe({
  //     next: () => {
  //       this.router.navigateByUrl(`/confirm-email`, {
  //         state: { phone: '+123' },
  //       });
  //     },
  //     error: () => {
  //       this.error = true;
  //     },
  //   });
  // }
}
