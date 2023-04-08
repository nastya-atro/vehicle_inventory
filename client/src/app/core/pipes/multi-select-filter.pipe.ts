import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msf',
  pure: false,
})
export class MultiSelectFilterPipe implements PipeTransform {
  transform(items: any[], filter: any[]): any {
    if (!items || !filter?.length) {
      return items;
    }
    return items.filter(item => !filter.find(f => f.id === item.id));
  }
}
