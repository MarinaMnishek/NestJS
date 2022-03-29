import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { PostsService } from '../modules/posts/posts.service';
import { Posts, CreatePost } from '../dto/post.dto';


@Controller('posts')
export class PostsController {
  constructor(private readonly appService: PostsService) { }

  @Get('get-all')
  async getPosts(): Promise<Posts[]> {
    return this.appService.getPosts();
  }

  @Get('get-one')
  async getPost(@Query() query: { id: number }): Promise<Posts | undefined> {
    return this.appService.getPost(query.id);
  }

  @Post('create')
  async createPost(@Body() data: CreatePost): Promise<Posts> {
    return this.appService.createPost(data);
  }

  @Delete('delete')
  async deletePost(@Query() query: { id: number }): Promise<Posts[]> {
    return this.appService.deletePost(query.id);
  }

  @Put('update')
  async updatePost(@Body() data: Posts): Promise<Posts> {
    return this.appService.updatePost(data);
  }
}
