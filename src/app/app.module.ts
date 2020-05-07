import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APIInterceptor} from './services/httpInterceptors/apiIntercepteor';
import {ResponseInterceptor} from './services/httpInterceptors/ResponseInterceptor';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
