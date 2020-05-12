import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {ListUsersComponent} from './components/list-users/list-users.component';

const routes: Routes = [
  {path: 'edit', component: EditProfileComponent},
  {path: 'password', component: ChangePasswordComponent},
  {path: 'list-users', component: ListUsersComponent},
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
