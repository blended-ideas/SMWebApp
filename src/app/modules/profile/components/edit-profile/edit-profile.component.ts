import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faInfoCircle, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {SessionService} from '../../../../services/session.service';
import {UserInterface} from '../../../../interfaces/user.interface';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  isProfileLoading: boolean;
  profileForm: FormGroup;

  faSpinner = faSpinner;
  faInfoCircle = faInfoCircle;

  private user: UserInterface;

  constructor(private sessionService: SessionService,
              private userService: UserService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.user;
    this.buildForm();
  }

  onUpdate() {
    console.log(this.profileForm.value);
    this.userService.updateUser(this.user.id, this.profileForm.value).subscribe(response => {
      this.sessionService.user = response;
      this.user = response;
      alert('Details Updated. You might need to re-login for details to be updated completely');
    });
  }

  private buildForm() {
    this.profileForm = this.fb.group({
      name: [this.user.name, [Validators.required, Validators.maxLength(220), Validators.minLength(2)]],
      username: [this.user.username, [
        Validators.required, Validators.maxLength(100), Validators.minLength(2),
        Validators.pattern('^[a-zA-Z][a-zA-Z0-9]{1,100}$')
      ]],
    });
  }
}
