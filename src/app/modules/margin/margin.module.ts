import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DailyMarginComponent} from './components/daily-margin/daily-margin.component';
import {MarginRoutingModule} from './margin-routing.module';


@NgModule({
  declarations: [DailyMarginComponent],
  imports: [
    CommonModule,
    MarginRoutingModule,
  ]
})
export class MarginModule {
}
