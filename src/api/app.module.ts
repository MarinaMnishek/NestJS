import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { CommentsController } from './controllers/comments.controller';
import { CommentsModule } from './modules/comments/comments.module';
import { PostsModule } from './modules/posts/posts.module';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    CommentsModule,
    PostsModule,
    MulterModule.register({
      dest: './upload',
    })
  ],
  controllers: [PostsController, CommentsController],
  providers: [Array],
})
export class AppModule { }
