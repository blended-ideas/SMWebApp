import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {UserInterface} from '../../../../interfaces/user.interface';
import {faEdit, faKey, faPlus, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ManageUserComponent} from '../manage-user/manage-user.component';
import {HttpParams} from '@angular/common/http';
import {ChangeUserPasswordComponent} from '../change-user-password/change-user-password.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  faSpinner = faSpinner;
  faEdit = faEdit;
  faPlus = faPlus;
  faKey = faKey;

  users: UserInterface[];
  isLoading: boolean;

  constructor(private userService: UserService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    const params = new HttpParams().set('for_management', 'true');
    this.userService.getUsers(params).subscribe(response => {
      this.isLoading = false;
      this.users = response;
    });
  }

  openEdit(user: UserInterface) {
    const modal = this.modalService.open(ManageUserComponent);
    modal.componentInstance.user = user;
    modal.result.then((usr: UserInterface) => {
      const index = this.users.findIndex(u => u.id === usr.id);
      this.users.splice(index, 1, usr);
    }, () => {
    });
  }

  changeUserPassword(user: UserInterface) {
    const modal = this.modalService.open(ChangeUserPasswordComponent);
    modal.componentInstance.user = user;
    modal.result.then((usr: UserInterface) => {
      const index = this.users.findIndex(u => u.id === usr.id);
      this.users.splice(index, 1, usr);
    }, () => {
    });
  }

  createUser() {
    const modal = this.modalService.open(ManageUserComponent);
    modal.result.then((usr: UserInterface) => {
      this.users.push(usr);
    }, () => {
    });
  }
}
