import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteRoleDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	value!: string;
}
