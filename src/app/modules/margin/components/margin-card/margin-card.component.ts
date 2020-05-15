import {Component, Input} from '@angular/core';
import {MarginDataInterface} from '../../../../interfaces/margin.interface';

@Component({
  selector: 'app-margin-card',
  templateUrl: './margin-card.component.html',
  styleUrls: ['./margin-card.component.scss']
})
export class MarginCardComponent {
  @Input() marginData: MarginDataInterface;
  @Input() title: string;
  @Input() substring: string;
}
