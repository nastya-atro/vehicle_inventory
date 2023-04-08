import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_ROUTES } from './app.routes';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { StoreModule } from '@ngrx/store';
import { rootReducer as root } from './store/app.reducer';

const config: any = {
  useHash: false,
  relativeLinkResolution: 'legacy',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES, config),
    StoreModule.forRoot({ root }, {}),
    HttpClientModule,
    AuthLayoutModule,
    MainLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializer,
    //   deps: [[new Inject(Store)]],
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
