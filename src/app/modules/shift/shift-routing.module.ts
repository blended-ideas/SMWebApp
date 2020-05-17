import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from '../../services/routerGuards/role-guard.service';
import {CreateShiftComponent} from './components/create-shift/create-shift.component';
import {ViewShiftComponent} from './components/view-shift/view-shift.component';
import {ListShiftComponent} from './components/list-shift/list-shift.component';
import {EditShiftComponent} from './components/edit-shift/edit-shift.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateShiftComponent,
    canActivate: [RoleGuard],
    data: {roles: ['Admin', 'Auditor', 'Shift']}
  },
  {
    path: ':shiftId/edit',
    component: EditShiftComponent,
    canActivate: [RoleGuard],
    data: {roles: ['Admin', 'Auditor']}
  },
  {path: ':shiftId/view', component: ViewShiftComponent},
  {path: '', component: ListShiftComponent},
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
export class ShiftRoutingModule {
}
