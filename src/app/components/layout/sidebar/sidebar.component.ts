import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../services/session.service';
import {faFileExcel, faPenAlt, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {APP_NAME} from '../../../constants/app.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  app_name = APP_NAME;
  viewMargin: boolean;

  faShoppingCart = faShoppingCart;
  faPenAlt = faPenAlt;
  faFileExcel = faFileExcel;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.viewMargin = this.sessionService.isAdmin() || this.sessionService.isAuditor();
  }

}
