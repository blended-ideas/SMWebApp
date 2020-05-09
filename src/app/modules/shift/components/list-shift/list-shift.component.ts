import {Component, OnInit} from '@angular/core';
import {faPlusSquare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-shift',
  templateUrl: './list-shift.component.html',
  styleUrls: ['./list-shift.component.scss']
})
export class ListShiftComponent implements OnInit {
  faPlusSquare = faPlusSquare;

  constructor() {
  }

  ngOnInit(): void {
  }

}
