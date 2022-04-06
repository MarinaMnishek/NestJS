import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts/posts.module';
import { PostsController } from './controllers/posts.controller';
import { CommentsController } from './controllers/comments.controller';
// import { MulterModule } from '@nestjs/platform-express';
// import { LoggerModule } from './modules/logger/logger.module';
// import { MailModule } from '../mail/mail.module';
import { MailController } from '../mail/mail.controller';
import { DatabaseModule } from './database/database.module';
import { CommentsModule } from './modules/comments/comments.module'

@Module({
  // imports: [PostsModule, CommentsModule, MailModule],
  // controllers: [PostsController, CommentsController, MailController],
  imports: [DatabaseModule, PostsModule, CommentsModule],
  controllers: [PostsController, CommentsController]
})
export class ApiModule {}
