import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'inr'
})
export class InrPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    if (!isNaN(value)) {
      const currencySymbol = '₹';
      const result = value.toString().split('.');

      let lastThree = result[0].substring(result[0].length - 3);
      const otherNumbers = result[0].substring(0, result[0].length - 3);
      if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
      }

      const output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
      const decimal = parseFloat('.' + (result[1] || '00')).toFixed(2).split('.');

      return currencySymbol + output + '.' + decimal[1];
    }
    return '';
  }
}
