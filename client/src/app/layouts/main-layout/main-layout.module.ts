import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule } from '@angular/router';
import { MAIN_LAYOUT_ROUTES } from './main-layout-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [SharedModule, RouterModule.forChild(MAIN_LAYOUT_ROUTES), CommonModule],
  exports: [MainLayoutComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (us: AuthenticationService) => () => {
        return us.initializer();
      },
      deps: [AuthenticationService],
      multi: true,
    },
  ],
})
export class MainLayoutModule {}
