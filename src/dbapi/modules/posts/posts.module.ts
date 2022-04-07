import { Module } from '@nestjs/common';
import { PostsController } from '../../controllers/posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../../database/entities/post.entity';




@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
