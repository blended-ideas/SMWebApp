import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {ProductRoutingModule} from './profile-routing.module';
import {ListProductComponent} from './components/list-product/list-product.component';
import {CreateProductComponent} from './components/create-product/create-product.component';
import {ViewProductComponent} from './components/view-product/view-product.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {PipeModule} from '../pipe/pipe.module';
import {AddRemoveStockComponent} from './components/add-remove-stock/add-remove-stock.component';


@NgModule({
  declarations: [
    ListProductComponent,
    CreateProductComponent,
    ViewProductComponent,
    AddRemoveStockComponent
  ],
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
