import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {ProductRoutingModule} from './profile-routing.module';
import {ListProductComponent} from './components/list-product/list-product.component';
import {EditProductComponent} from './components/edit-product/edit-product.component';
import {CreateProductComponent} from './components/create-product/create-product.component';
import {ViewProductComponent} from './components/view-product/view-product.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PipeModule} from '../pipe/pipe.module';


@NgModule({
  declarations: [ListProductComponent, EditProductComponent, CreateProductComponent, ViewProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    ProductRoutingModule,
    FontAwesomeModule,
    NgbPaginationModule,
    NgbDropdownModule,
    PipeModule,
  ]
})
export class ProductModule {
}
