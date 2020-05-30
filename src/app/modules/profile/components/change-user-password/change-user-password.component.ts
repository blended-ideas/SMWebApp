import {Component, Input, OnInit} from '@angular/core';
import {UserInterface} from '../../../../interfaces/user.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {merge} from 'rxjs';
import {UserService} from '../../../../services/user.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.scss']
})
export class ChangeUserPasswordComponent implements OnInit {
  @Input() user: UserInterface;

  passwordForm: FormGroup;
  matchPasswordError: boolean;

  constructor(private fb: FormBuilder,
              private modal: NgbActiveModal,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });

    merge(this.passwordForm.controls.password.valueChanges, this.passwordForm.controls.confirm_password.valueChanges)
      .subscribe((values) => {
        this.matchPasswordError = this.passwordForm.controls.password.value !== this.passwordForm.controls.confirm_password.value;
      });
  }

  updatePassword() {
    if (this.matchPasswordError) {
      return;
    }
    this.userService.updateUserPassword(this.user.id, {password: this.passwordForm.controls.password.value})
      .subscribe((response) => {
        console.log(response);
        alert('Password changed successfully.');
        this.modal.close(this.user);
      }, error => {
        const keys = Object.keys(error.error);
        alert(error.error[keys[0]]);
      });
  }
}
