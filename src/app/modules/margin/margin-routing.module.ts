import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from '../../services/routerGuards/role-guard.service';
import {MarginDisplayComponent} from './components/margin-display/margin-display.component';

const routes: Routes = [
  {
    path: '',
    component: MarginDisplayComponent,
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
