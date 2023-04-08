import { Component } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 0.4, delay: 0 },
        })
      ),
    ]),
  ],
})
export class AuthLayoutComponent {
  constructor() {}
}
