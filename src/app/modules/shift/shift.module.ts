import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListShiftComponent} from './components/list-shift/list-shift.component';
import {CreateShiftComponent} from './components/create-shift/create-shift.component';
import {ViewShiftComponent} from './components/view-shift/view-shift.component';
import {ShiftRoutingModule} from './shift-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule, NgbDropdownModule, NgbPaginationModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {PipeModule} from '../pipe/pipe.module';
import {EditShiftComponent} from './components/edit-shift/edit-shift.component';
import {AddProductsToShiftComponent} from './components/view-shift/add-products-to-shift/add-products-to-shift.component';
import {EditShiftEntryComponent} from './components/view-shift/edit-shift-entry/edit-shift-entry.component';


@NgModule({
  declarations: [ListShiftComponent, CreateShiftComponent, ViewShiftComponent, EditShiftComponent, AddProductsToShiftComponent, EditShiftEntryComponent],
  imports: [
    CommonModule,
    ShiftRoutingModule,
    FontAwesomeModule,
    NgBootstrapFormValidationModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgSelectModule,
    NgbPaginationModule,
    FormsModule,
    NgbDropdownModule,
    PipeModule
  ]
})
export class ShiftModule {
}
