import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './services/routerGuards/auth-guard.service';
import {BaseViewComponent} from './components/layout/base-view/base-view.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: BaseViewComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
