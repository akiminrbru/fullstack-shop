import { ApiProperty } from '@nestjs/swagger';

export class AddCartDto {
  @ApiProperty({ example: '1', description: 'ID товара' })
  id: number;
}
