import { AuthLayoutComponent } from './auth-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AUTH_LAYOUT_ROUTES } from './auth-layout-routing.module';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [RouterModule.forChild(AUTH_LAYOUT_ROUTES)],
  exports: [AuthLayoutComponent],
})
export class AuthLayoutModule {}
