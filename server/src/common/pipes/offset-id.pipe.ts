import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class OffsetIdPipe implements PipeTransform {
  constructor(private offset: number) {}

  async transform(value: number, metadata: ArgumentMetadata) {
    return value - this.offset;
  }
}
