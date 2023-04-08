import { IsNotEmpty, IsString } from 'class-validator';

export class OrderInputDto {
  @IsString()
  @IsNotEmpty()
  sortBy: string;

  @IsString()
  @IsNotEmpty()
  sortOrder: 'ASC' | 'DESC';
}
