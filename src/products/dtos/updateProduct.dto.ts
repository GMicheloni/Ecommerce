import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class updateProductDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(80)
  name: string;
  @IsString()
  @IsOptional()
  @MaxLength(80)
  description: string;
  @IsOptional()
  @IsNumber()
  price: number;
  @IsOptional()
  stock: number;
  @IsOptional()
  imgUrl: string;
}
