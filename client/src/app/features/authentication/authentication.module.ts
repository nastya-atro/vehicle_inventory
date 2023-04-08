import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AUTHENTICATION_ROUTES } from './authentication.routes';
import { SharedModule } from '../../shared/shared.module';
import { SignupComponent } from './sign-up/signup.component';
import { SignInComponent } from './sign-in/signin.component';
import { ConfirmEmailComponent } from './activate-profile/2-step_confirm-email/confirm-email.component';
import { PreActivateComponent } from './activate-profile/1-step_pre-activate/pre-activate.component';
import { EndActivateComponent } from './activate-profile/3-step_end-activate/end-activate.component';

@NgModule({
  imports: [RouterModule.forChild(AUTHENTICATION_ROUTES), FormsModule, ReactiveFormsModule, CommonModule, SharedModule],
  declarations: [SignupComponent, SignInComponent, EndActivateComponent, ConfirmEmailComponent, PreActivateComponent],
})
export class AuthenticationModule {}
