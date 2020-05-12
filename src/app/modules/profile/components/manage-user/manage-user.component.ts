import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {UserInterface, UserRoleInterface} from '../../../../interfaces/user.interface';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  @Input() user: UserInterface;
  mode: 'create' | 'edit';
  userForm: FormGroup;
  initialLoading: boolean;
  matchPasswordError: boolean;
  roles: UserRoleInterface[];

  constructor(private userService: UserService,
              private activeModal: NgbActiveModal,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.mode = this.user ? 'edit' : 'create';
    this.initialLoading = true;
    this.userService.getRoles().subscribe(response => {
      this.roles = response;
      this.initialLoading = false;
      this.buildForm();
    });
  }

  saveUser() {
    console.log(this.userForm.value);
    let apiCall: Observable<UserInterface>;

    if (this.mode === 'edit') {
      apiCall = this.userService.updateUser(this.user.id, this.userForm.value);
    } else {
      apiCall = this.userService.createUser(this.userForm.value);
    }

    apiCall.subscribe(response => {
      this.activeModal.close(response);
    });
  }

  private buildForm() {
    this.userForm = this.fb.group({
      username: [this.user?.username || '', [Validators.required, Validators.maxLength(100)]],
      name: [this.user?.name || '', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      roles_change: this.fb.group({
        auditor: [this.user?.roles.some(rl => rl.label === 'auditor') || false],
        shiftworker: [this.user?.roles.some(rl => rl.label === 'shiftworker') || false]
      })
    });

    if (this.mode === 'create') {
      this.userForm.addControl('password',
        this.fb.control('', [
          Validators.required, Validators.minLength(6), Validators.maxLength(10)
        ])
      );
      this.userForm.addControl(
        'confirm_password', this.fb.control('', [
          Validators.required, Validators.minLength(6), Validators.maxLength(10)
        ])
      );


      this.userForm.controls.password.valueChanges.subscribe((value) => {
        this.matchPasswordError = value !== this.userForm.controls.confirm_password.value;
      });
      this.userForm.controls.confirm_password.valueChanges.subscribe((value) => {
        this.matchPasswordError = value !== this.userForm.controls.password.value;
      });
    }
  }
}
