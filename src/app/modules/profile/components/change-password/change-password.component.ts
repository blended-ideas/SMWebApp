import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../services/authentication.service';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {SessionService} from '../../../../services/session.service';
import {UserInterface} from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  faSpinner = faSpinner;
  isPasswordChanging: boolean;
  matchPasswordError: boolean;
  bkError = {
    hasError: false,
    value: ''
  };
  private user: UserInterface;

  constructor(private authenticationService: AuthenticationService,
              private fb: FormBuilder,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.user;
    this.passwordForm = this.fb.group({
      old_password: ['', [Validators.required, Validators.maxLength(20)]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.passwordForm.controls.confirm_password.valueChanges.subscribe((value) => {
      this.matchPasswordError = value !== this.passwordForm.controls.new_password.value;
    });

    this.passwordForm.controls.new_password.valueChanges.subscribe((value) => {
      this.matchPasswordError = value !== this.passwordForm.controls.confirm_password.value;
    });

    this.passwordForm.valueChanges.subscribe(() => {
      this.bkError = {
        hasError: false,
        value: ''
      };
    });
  }

  changePassword() {
    const values = this.passwordForm.value;

    this.matchPasswordError = values.new_password !== values.confirm_password;
    if (this.matchPasswordError) {
      return;
    }

    this.bkError = {
      hasError: false,
      value: ''
    };

    this.authenticationService.changePassword(this.user.id, values).subscribe((response) => {
      console.log(response);
      alert('Password changed successful.');
    }, error => {
      const keys = Object.keys(error.error);
      this.bkError = {
        hasError: true,
        value: `${keys[0]}: ${error.error[keys[0]]}`
      };
    });
  }
}
