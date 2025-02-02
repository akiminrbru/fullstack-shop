import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty({ example: '1', description: 'ID товара' })
  id: number;

  @ApiProperty({ example: '2', description: 'Количество товара' })
  @IsInt()
  @Min(0)
  @Max(10)
  quantity: number;
}
