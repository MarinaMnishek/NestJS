import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { News } from './dto/news.dto';

@Controller('news')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-all')
  async getNews(): Promise<News[]> {
    return this.appService.getNews();
  }

  @Get('get-one')
  async getNewsItem(@Query() query: { id: number }): Promise<News | undefined> {
    return this.appService.getNewsItem(query.id);
  }

  @Put('create')
  async createNews(@Body() data: News): Promise<News> {
    return this.appService.createNews(data);
  }

  @Delete('delete')
  async deleteNews(@Query() query: { id: number }): Promise<News[]> {
    return this.appService.deleteNews(query.id);
  }

  @Post('update')
  async updateNews(@Body() data: News): Promise<News> {
    return this.appService.updateNews(data);
  }
}
