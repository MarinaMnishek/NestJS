import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CalcService } from './calc.service';
import { Calc } from './dto/calc.dto';
import {News} from "../api/dto/news.dto";


@Controller('calc')
export class CalcController {

    constructor(private readonly calcService: CalcService) {}

    @Get('get-all')
    async getCalcItems(): Promise<Calc[]> {
        return this.calcService.getCalcItems();
    }

    @Put('create')
    async createCalcItems(@Body() data: Calc): Promise<Calc> {
        return this.calcService.createCalcItems(data);
    }

    @Get('calculate')
    async calculate(): Promise<Calc[]> {
        return this.calcService.calculate();
    }


}
