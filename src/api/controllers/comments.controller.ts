import { Body, Controller, Delete, Get, Post, Put, Query, Res, UploadedFile, UseInterceptors, StreamableFile } from '@nestjs/common';
import { CommentsService } from '../modules/comments/comments.service';
import { Comments } from '../dto/comments.dto';
import { DecrementId } from '../../utils/decorators/decrement-id';
import { DecrementIdFromBody } from '../../utils/decorators/decrement-id-from-body';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express'
import { createReadStream } from 'fs';
import { join } from 'path';
import { LoggingInterceptor } from '../modules/logger/logger.interceptor';


// @UseInterceptors(new LoggingInterceptor)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Get('get-all')
  async getComments(@Query() @DecrementId(['postId']) query: { postId: number }): Promise<Comments[]> {
    return this.commentsService.getComments(query.postId);
  }

  @Get('get-one')
  async getComment(@Query() @DecrementId(['postId', 'commentId']) query: { postId: number, commentId: number }): Promise<Comments | undefined> {
   

    return this.commentsService.getComment(query.postId, query.commentId);
  }

  @Post('create')
  async createComment(@Query() query: { postId: number }, @Body() data: Comments): Promise<Comments> {
    return this.commentsService.createComment(query.postId, data);
  }


  @Delete('delete')
  async deleteComment(@Body() @DecrementIdFromBody(['postId']) body: { postId: number, commentId: number }): Promise<Comments[]> {
    return this.commentsService.deleteComment(body.postId, body.commentId);
  }

  @Put('update')
  async updateComment(@Query() query: { postId: number, commentId: number }, @Body() data: Comments): Promise<Comments> {
    return this.commentsService.updateComment(query.postId, query.commentId, data);
  }

  @Post('upload')
  @UseInterceptors(new LoggingInterceptor())
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Body() body: { postId: number, commentId: number }, @UploadedFile() file: Express.Multer.File) {
    await this.commentsService.assignFile(body.postId, body.commentId, file.path)
    
  }

  @Get('file')
  async getFile(@Query() @DecrementId(['postId', 'commentId']) query: { postId: number, commentId: number }, @Res() res: Response) {
    const path = await this.commentsService.getPath(query.postId, query.commentId)
    if (!path) throw new Error('No attachment found')
        const file = createReadStream(join(process.cwd(), path));
        file.pipe(res);
      }


}
