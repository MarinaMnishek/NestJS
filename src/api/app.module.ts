import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { CommentsController } from './controllers/comments.controller';
import { CommentsModule } from './modules/comments/comments.module';
import { PostsModule } from './modules/posts/posts.module';
// import { CommentsService } from './modules/comments/comments.service';
// import { PostsService } from './modules/posts/posts.service';

@Module({
  imports: [
    CommentsModule,
    PostsModule
  ],
  controllers: [PostsController, CommentsController],
  providers: [Array],
})
export class AppModule {}
