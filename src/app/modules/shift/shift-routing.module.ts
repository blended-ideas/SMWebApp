import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewShiftComponent} from './components/view-shift/view-shift.component';
import {ListShiftComponent} from './components/list-shift/list-shift.component';

const routes: Routes = [
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
