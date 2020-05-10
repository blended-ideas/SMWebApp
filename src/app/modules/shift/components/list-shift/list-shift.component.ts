import {Component, OnInit} from '@angular/core';
import {faEdit, faEye, faPlusSquare, faSearch, faSortDown, faSortUp, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ShiftService} from '../../../../services/shift.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';
import {ShiftDetailInterface} from '../../../../interfaces/shift.interface';

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

  constructor(private shiftService: ShiftService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParamMap => {
      this.fetchShifts(queryParamMap);
    });
  }

  changeQueryParam(paramType: 'search' | 'sort' | 'page', paramValue: string | number) {
    const queryParams = {
      page: this.paginationHelper.pageSize,
      sort: this.sortContext.value,
      search: this.searchText
    };

    switch (paramType) {
      case 'page':
        queryParams.page = paramValue as number;
        break;
      case 'search':
        queryParams.page = 1;
        queryParams.search = paramValue as string;
        break;
      case 'sort':
        queryParams.page = 1;
        queryParams.sort = paramValue as string;
        break;
    }
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams
    });
  }

  private fetchShifts(queryParamMap: ParamMap) {
    let params = new HttpParams().set('page_size', this.paginationHelper.pageSize.toString());

    if (queryParamMap.has('search')) {
      this.searchText = queryParamMap.get('search');
      params = params.set('search', this.searchText);
    }

    if (queryParamMap.has('page')) {
      this.paginationHelper.currentPage = Number(queryParamMap.get('page'));
      params = params.set('page', this.paginationHelper.currentPage.toString());
    }

    if (queryParamMap.has('sort')) {
      const sortString = queryParamMap.get('sort');
      this.sortContext = this.sortValues.find(sv => sv.value === sortString);
    }
    this.sortContext = this.sortContext || this.sortValues[0];
    params = params.set('ordering', this.sortContext.value);

    this.shiftService.getShifts(params)
      .subscribe(response => {
        this.shifts = response.results;
        console.log(this.shifts);
        this.paginationHelper.totalSize = response.count;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }
}
