import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CommentsService } from '../modules/comments/comments.service';
import { Comments } from '../dto/comments.dto';
import { DecrementId } from '../../utils/decorators/decrement-id'
import { DecrementIdFromBody } from '../../utils/decorators/decrement-id-from-body';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Get('get-all')
  async getComments(@Query() @DecrementId(['postId']) query: { postId: number }): Promise<Comments[]> {
    return this.commentsService.getComments(query.postId);
  }

  @Get('get-one')
  async getComment(@Query() @DecrementId(['postId', 'commentId']) query: { postId: number, commentId: number }): Promise<Comments | undefined> {
    console.log(query.postId + ' ' + query.commentId);

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

  // @Delete('delete')
  // async deleteComment(@Query() query: { postId: number, commentId: number }): Promise<Comments[]> {
  //   return this.commentsService.deleteComment(query.id);
  // }


}
