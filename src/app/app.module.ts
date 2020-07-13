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
import {HeaderComponent} from './components/layout/header/header.component';
import {SidebarComponent} from './components/layout/sidebar/sidebar.component';
import {BaseViewComponent} from './components/layout/base-view/base-view.component';
import {NgbCollapseModule, NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    BaseViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgbPaginationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
