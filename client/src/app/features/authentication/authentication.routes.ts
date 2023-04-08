import { Routes } from '@angular/router';
import { SignupComponent } from './sign-up/signup.component';
import { SignInComponent } from './sign-in/signin.component';
import { ConfirmEmailComponent } from './activate-profile/2-step_confirm-email/confirm-email.component';
import { PreActivateComponent } from './activate-profile/1-step_pre-activate/pre-activate.component';
import { EndActivateComponent } from './activate-profile/3-step_end-activate/end-activate.component';

export const AUTHENTICATION_ROUTES: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SignInComponent,
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
  },
  {
    path: 'pre-activate',
    component: PreActivateComponent,
  },
  {
    path: 'activating',
    component: EndActivateComponent,
  },
];
