import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { AlertGateway } from './alert.gateway';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Alert default')
@Controller('alert')
export class AlertController {

    constructor(private alertGateway: AlertGateway) {}

    @ApiOperation({
        summary: 'Alert default',
      })
      @ApiBody({ type: String})
      @ApiResponse({ status: 200, type: String })
    @Post()
    @HttpCode(200)
    sendAlertToAll(@Body() dto: { message: string }) {
        this.alertGateway.sendToAll(dto.message);
        return dto;
    }
}
