import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';

const routes: Routes = [
  {path: 'edit', component: EditProfileComponent},
  {path: 'password', component: ChangePasswordComponent},
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
export class ProfileRoutingModule {
}
