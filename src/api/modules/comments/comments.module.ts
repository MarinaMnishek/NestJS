import { Module } from '@nestjs/common';
import { CommentsController } from '../../controllers/comments.controller';
import { CommentsService } from '../comments/comments.service';
import { PostsModule } from '../posts/posts.module';


@Module({
  imports: [PostsModule],
  controllers: [CommentsController],
  providers: [Array, CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
