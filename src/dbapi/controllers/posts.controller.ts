import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth-guard';
import { Roles } from '../auth/roles-decorator';
import { RolesGuard } from '../auth/roles-guard';
import { Posts } from '../database/entities/post.entity';
import { PostsDTO } from '../dto/post.dto';
import { PostsService } from '../modules/posts/posts.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Новости(посты)')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Получение постов',
  })
  @ApiResponse({ status: 200, type: [PostsDTO] })
  @Get('get-all')
  async getPosts(): Promise<Posts[]> {
    return this.postsService.getPosts();
  }

  @ApiOperation({
    summary: 'Получение одного поста',
  })
  @ApiQuery({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: PostsDTO })
  @Get('get-one')
  async getPost(@Query() query: { id: number }): Promise<Posts | undefined> {
    return this.postsService.getPost(query.id);
  }
  
  @ApiOperation({
    summary: 'Создание поста',
  })
  @ApiBody({ type: PostsDTO })
  @ApiResponse({ status: 201, type: PostsDTO })
  @Roles("User")
  @UseGuards(RolesGuard)
  @Post('create')
  async createPost(@Body() data: PostsDTO): Promise<Posts> {
    return this.postsService.createPost(data);
  }

  @ApiOperation({
    summary: 'Удаление поста',
  })
  @ApiBody({ type: Number })
  @ApiResponse({ status: 200, type: PostsDTO })
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Delete('delete')
  async deletePost(@Body() body: { id: number }): Promise<Posts> {
    return this.postsService.deletePost(body.id);
  }

  @ApiOperation({
    summary: 'Обновление поста',
  })
  @ApiQuery({ name: 'id', type: Number })
  @ApiBody({ type: PostsDTO})
  @ApiResponse({ status: 200, type: PostsDTO })
  @Put('update')
  async updatePost(
    @Query() query: { id: number },
    @Body() data: PostsDTO,
  ): Promise<Posts> {
    return this.postsService.updatePost(query.id, data);
  }
}
