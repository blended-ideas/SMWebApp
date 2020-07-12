import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InrPipe} from './inr.pipe';
import {StatusDisplayPipe} from './status-display.pipe';


@NgModule({
  declarations: [
    InrPipe,
    StatusDisplayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InrPipe,
    StatusDisplayPipe
  ]
})
export class PipeModule {
}
