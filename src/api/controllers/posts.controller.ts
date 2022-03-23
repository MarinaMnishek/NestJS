import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { PostsService } from '../modules/posts/posts.service';
import { Posts } from '../dto/post.dto';


@Controller('posts')
export class PostsController {
  constructor(private readonly appService: PostsService) {}

  @Get('get-all')
  async getPosts(): Promise<Posts[]> {
    return this.appService.getPosts();
  }

  @Get('get-one')
  async getPost(@Query() query: { id: number }): Promise<Posts | undefined> {
    return this.appService.getPost(query.id);
  }

  @Put('create')
  async createPost(@Body() data: Posts): Promise<Posts> {
    return this.appService.createPost(data);
  }

  @Delete('delete')
  async deletePost(@Query() query: { id: number }): Promise<Posts[]> {
    return this.appService.deletePost(query.id);
  }

  @Post('update')
  async updatePost(@Body() data: Posts): Promise<Posts> {
    return this.appService.updatePost(data);
  }
}
