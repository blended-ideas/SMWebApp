import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DailyMarginComponent} from './components/daily-margin/daily-margin.component';
import {MarginRoutingModule} from './margin-routing.module';
import {NgbDatepickerModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PipeModule} from '../pipe/pipe.module';


@NgModule({
  declarations: [DailyMarginComponent],
  imports: [
    CommonModule,
    MarginRoutingModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    FontAwesomeModule,
    PipeModule,
  ]
})
export class MarginModule {
}
