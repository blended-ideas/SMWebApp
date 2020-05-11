import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from '../../services/routerGuards/role-guard.service';
import {DailyMarginComponent} from './components/daily-margin/daily-margin.component';

const routes: Routes = [
  {
    path: 'daily',
    component: DailyMarginComponent,
    canActivate: [RoleGuard],
    data: {roles: ['Admin', 'Auditor']}
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MarginRoutingModule {
}
