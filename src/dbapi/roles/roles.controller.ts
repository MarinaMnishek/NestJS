import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth-guard';
import { Roles } from '../auth/roles-decorator';
import { RolesGuard } from '../auth/roles-guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { RolesService } from './roles.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Роли')
@Controller('/roles')
@Roles("Admin")
@UseGuards(AuthGuard, RolesGuard)
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@ApiOperation({
		summary: 'Создание роли',
	  })
	@ApiBody({ type: CreateRoleDto})
	@ApiResponse({ status: 200, type: CreateRoleDto })
	@Post('create')
	create(@Body() params: CreateRoleDto) {
		return this.rolesService.create(params);
	}

	@ApiOperation({
		summary: 'Удаление роли',
	  })
	@ApiBody({ type: DeleteRoleDto})
	@ApiResponse({ status: 200, type: DeleteRoleDto })
	@Delete('delete')
	delete(@Body() { value }: DeleteRoleDto) {
		return this.rolesService.deleteByValue(value);
	}

	@ApiOperation({
		summary: 'Проверка роли',
	  })
	@ApiBody({ type: DeleteRoleDto})
	@ApiResponse({ status: 200, type: DeleteRoleDto })
	@Post('restore')
	restore(@Body() { value }: DeleteRoleDto) {
		return this.rolesService.restore(value);
	}

	@ApiOperation({
		summary: 'Получение роли',
	  })
	@ApiBody({ type: DeleteRoleDto})
	@ApiResponse({ status: 200, type: DeleteRoleDto })
	@Post('get')
	get(@Body() { value }: DeleteRoleDto) {
		return this.rolesService.getByValue(value);
	}
}
