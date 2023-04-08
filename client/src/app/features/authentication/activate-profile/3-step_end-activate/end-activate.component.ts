import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-end-activate',
  templateUrl: './end-activate.component.html',
  styleUrls: ['./end-activate.component.scss'],
})
export class EndActivateComponent implements OnInit {
  confirmationError = false;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    const token = this.router.parseUrl(this.router.url).queryParams['token'];
    if (token) {
      this.authService.activateProfile(token).subscribe({
        next: () => {},
        error: () => {
          this.confirmationError = true;
        },
      });
    }
  }
}
