import {Component, OnInit} from '@angular/core';
import {APP_NAME} from '../../../constants/app.constants';
import {UserInterface} from '../../../interfaces/user.interface';
import {SessionService} from '../../../services/session.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  app_name = APP_NAME;
  user: UserInterface;
  isMenuCollapsed = true;
  isAdmin: boolean;

  constructor(private sessionService: SessionService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.user;
    this.isAdmin = this.sessionService.isAdmin();
  }

  logout() {
    if (confirm('Logout?')) {
      this.authenticationService.clearCredentials();
    }
  }
}
