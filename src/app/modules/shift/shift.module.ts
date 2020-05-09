import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListShiftComponent} from './components/list-shift/list-shift.component';
import {CreateShiftComponent} from './components/create-shift/create-shift.component';
import {ViewShiftComponent} from './components/view-shift/view-shift.component';
import {ShiftRoutingModule} from './shift-routing.module';


@NgModule({
  declarations: [ListShiftComponent, CreateShiftComponent, ViewShiftComponent],
  imports: [
    CommonModule,
    ShiftRoutingModule
  ]
})
export class ShiftModule {
}
