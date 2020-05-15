import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarginDisplayComponent} from './components/margin-display/margin-display.component';
import {MarginRoutingModule} from './margin-routing.module';
import {NgbDatepickerModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PipeModule} from '../pipe/pipe.module';
import {MarginCardComponent} from './components/margin-card/margin-card.component';


@NgModule({
  declarations: [MarginDisplayComponent, MarginCardComponent],
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
