import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListShiftComponent} from './components/list-shift/list-shift.component';
import {CreateShiftComponent} from './components/create-shift/create-shift.component';
import {ViewShiftComponent} from './components/view-shift/view-shift.component';
import {ShiftRoutingModule} from './shift-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [ListShiftComponent, CreateShiftComponent, ViewShiftComponent],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    FontAwesomeModule,
    NgBootstrapFormValidationModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgSelectModule
  ]
})
export class ShiftModule {
}
