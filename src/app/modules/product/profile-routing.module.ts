import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListProductComponent} from './components/list-product/list-product.component';
import {CreateProductComponent} from './components/create-product/create-product.component';
import {ViewProductComponent} from './components/view-product/view-product.component';
import {RoleGuard} from '../../services/routerGuards/role-guard.service';

const routes: Routes = [
  {
    path: 'create',
    component: CreateProductComponent,
    canActivate: [RoleGuard],
    data: {roles: ['Admin', 'Auditor']}
  },
  {
    path: ':productId/edit',
    component: CreateProductComponent,
    canActivate: [RoleGuard],
    data: {roles: ['Admin', 'Auditor']}
  },
  {path: ':productId/view', component: ViewProductComponent},
  {path: '', component: ListProductComponent},
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
export class ProductRoutingModule {
}
