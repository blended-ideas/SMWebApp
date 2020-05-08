import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [EditProfileComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class ProfileModule {
}
