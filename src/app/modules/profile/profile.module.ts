import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ManageUserComponent} from './components/manage-user/manage-user.component';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {ChangeUserPasswordComponent} from './components/change-user-password/change-user-password.component';


@NgModule({
  declarations: [EditProfileComponent, ChangePasswordComponent, ManageUserComponent, ListUsersComponent, ChangeUserPasswordComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgBootstrapFormValidationModule,
    NgbPopoverModule
  ]
})
export class ProfileModule {
}
