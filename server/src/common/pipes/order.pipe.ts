import { PipeTransform, Injectable } from "@nestjs/common";
import { getDirection, getSortBy } from "../utils/pagination.utils";
import { plainToClass } from "class-transformer";
import { OrderInputDto } from "../dto/order.input.dto";

@Injectable()
export class OrderPipe implements PipeTransform {
  async transform(values: any) {
    const sortBy: string = getSortBy(values.sortBy);
    const sortOrder: string = getDirection(values.sortOrder?.toUpperCase());

    return {
      ...values,
      order: plainToClass(OrderInputDto, { sortBy, sortOrder }),
    };
  }
}
