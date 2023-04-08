import { PipeTransform, Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class FiltersPipe implements PipeTransform {
  constructor(private dto: ClassConstructor<any>) {}

  transform(values: any) {
    return {
      ...values,
      filters: plainToInstance(this.dto, values),
    };
  }
}
