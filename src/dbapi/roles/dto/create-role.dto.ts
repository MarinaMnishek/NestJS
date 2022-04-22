import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	value!: string;

	@ApiProperty()
	@IsString()
	description?: string;
}
