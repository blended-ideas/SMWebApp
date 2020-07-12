import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statusDisplay'
})
export class StatusDisplayPipe implements PipeTransform {
  readonly statusMap = {
    ALL: 'All',
    NEW: 'Open',
    WAITING_FOR_APPROVAL: 'Waiting For Approval',
    APPROVED: 'Approved'
  };

  transform(value: string): string {
    return this.statusMap[value];
  }

}
