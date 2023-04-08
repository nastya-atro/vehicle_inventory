import { PipeTransform, Injectable } from '@nestjs/common';
import { PaginationRequest } from '../models/pagination.model';
import { calculateOffset, getLimit, getPage } from '../utils/pagination.utils';
import { plainToClass } from 'class-transformer';
import { PaginationInputDto } from '../dto/pagination.input.dto';

@Injectable()
export class PaginationPipe implements PipeTransform {
  constructor(private defaultLimit?: number) {}

  // TODO: multiple sort
  async transform(values: PaginationRequest) {
    const limit: number = getLimit(values.limit, this.defaultLimit);
    const page: number = getPage(values.page);
    const offset: number = Math.abs(parseInt(values.offset, 10)) || calculateOffset(limit, page);

    return {
      ...values,
      pagination: plainToClass(PaginationInputDto, { limit, page, offset }),
    };
  }
}
