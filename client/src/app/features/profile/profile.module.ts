import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PROFILE_ROUTES } from './profile.routes';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [RouterModule.forChild(PROFILE_ROUTES), FormsModule, ReactiveFormsModule, CommonModule, SharedModule],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
