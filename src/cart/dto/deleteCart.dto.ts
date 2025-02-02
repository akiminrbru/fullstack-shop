import { ApiProperty } from '@nestjs/swagger';

export class DeleteCartDto {
  @ApiProperty({ example: '1', description: 'ID товара' })
  id: number;
}
