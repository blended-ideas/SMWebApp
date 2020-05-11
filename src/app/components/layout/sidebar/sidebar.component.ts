import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../services/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  viewMargins: boolean;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.viewMargins = this.sessionService.isAdmin() || this.sessionService.isAuditor();
  }

}
