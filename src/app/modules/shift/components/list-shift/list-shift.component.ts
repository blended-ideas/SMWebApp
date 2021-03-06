import {Component, OnInit} from '@angular/core';
import {
  faCalendar,
  faEdit,
  faEye,
  faPlusSquare,
  faSearch,
  faSortDown,
  faSortUp,
  faSpinner,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {ShiftService} from '../../../../services/shift.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {ShiftDetailInterface} from '../../../../interfaces/shift.interface';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {SessionService} from '../../../../services/session.service';
import {UserInterface} from '../../../../interfaces/user.interface';
import {CreateShiftComponent} from '../create-shift/create-shift.component';

@Component({
  selector: 'app-list-shift',
  templateUrl: './list-shift.component.html',
  styleUrls: ['./list-shift.component.scss']
})
export class ListShiftComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faEye = faEye;
  faSpinner = faSpinner;
  faSearch = faSearch;
  faCalendar = faCalendar;
  faTimes = faTimes;
  faSortDown = faSortDown;

  paginationHelper = {
    currentPage: 1,
    pageSize: 10,
    totalSize: 0
  };

  searchText: string;
  sortContext: { name: string, icon: IconDefinition, value: string };
  isLoading: boolean;
  shifts: ShiftDetailInterface[] = [];

  sortValues = [
    {name: 'Shift End Time', icon: faSortDown, value: '-end_dt'},
    {name: 'Shift End Time', icon: faSortUp, value: 'end_dt'},
  ];
  selectedDate: string;
  selectedDateRaw: NgbDateStruct;

  statusList = [
    'ALL', 'NEW', 'WAITING_FOR_APPROVAL', 'APPROVED'
  ];
  selectedStatus: string;

  isAdmin: boolean;
  isAuditor: boolean;
  user: UserInterface;

  constructor(private shiftService: ShiftService,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.fetchShifts(queryParamMap);
    });

    this.user = this.sessionService.user;
    this.isAdmin = this.sessionService.isAdmin();
    this.isAuditor = this.sessionService.isAuditor();
  }

  changeQueryParam(paramType: 'search' | 'sort' | 'page' | 'date' | 'status', paramValue: string | number | NgbDateStruct) {
    const queryParams = {
      page: this.paginationHelper.pageSize,
      sort: this.sortContext.value,
      search: this.searchText,
      date: this.selectedDate,
      status: this.selectedStatus,
    };

    switch (paramType) {
      case 'page':
        queryParams.page = paramValue as number;
        break;
      case 'search':
        queryParams.page = 1;
        queryParams.search = paramValue as string;
        break;
      case 'status':
        queryParams.page = 1;
        queryParams.status = paramValue as string;
        break;
      case 'sort':
        queryParams.page = 1;
        queryParams.sort = paramValue as string;
        break;
      case 'date':
        queryParams.page = 1;
        if (paramValue) {
          const day = paramValue as NgbDateStruct;
          queryParams.date = moment().year(day.year).month(day.month - 1).date(day.day).hours(0).minutes(0).seconds(0).toISOString();
        } else {
          queryParams.date = null;
        }
    }
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams
    });
  }

  startCreateShift() {
    this.modalService.open(CreateShiftComponent);
  }

  private fetchShifts(queryParamMap: ParamMap) {
    console.log(queryParamMap);
    let params = new HttpParams().set('page_size', this.paginationHelper.pageSize.toString());

    if (queryParamMap.has('search')) {
      this.searchText = queryParamMap.get('search');
      params = params.set('search', this.searchText);
    }

    if (queryParamMap.has('page')) {
      this.paginationHelper.currentPage = Number(queryParamMap.get('page'));
      params = params.set('page', this.paginationHelper.currentPage.toString());
    }

    if (queryParamMap.has('status')) {
      this.selectedStatus = queryParamMap.get('status');
      if (this.selectedStatus && this.selectedStatus !== 'ALL') {
        params = params.set('status', this.selectedStatus);
      }
    }

    if (queryParamMap.has('date')) {
      this.selectedDate = queryParamMap.get('date');
      params = params.set('date', this.selectedDate);
    } else {
      this.selectedDate = null;
    }
    const dt = this.selectedDate ? new Date(this.selectedDate) : new Date();
    this.selectedDateRaw = {year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate()};

    if (queryParamMap.has('sort')) {
      const sortString = queryParamMap.get('sort');
      this.sortContext = this.sortValues.find(sv => sv.value === sortString);
    }
    this.sortContext = this.sortContext || this.sortValues[0];
    params = params.set('ordering', this.sortContext.value);

    this.isLoading = true;
    this.shiftService.getShifts(params)
      .subscribe(response => {
        this.shifts = response.results;
        this.paginationHelper.totalSize = response.count;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }
}
