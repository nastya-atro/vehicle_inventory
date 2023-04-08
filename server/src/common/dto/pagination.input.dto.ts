import { IsInt, IsNotEmpty } from 'class-validator';

export class PaginationInputDto {
  @IsInt()
  @IsNotEmpty()
  limit: number;

  @IsInt()
  @IsNotEmpty()
  page: number;

  @IsInt()
  @IsNotEmpty()
  offset: number;
}
