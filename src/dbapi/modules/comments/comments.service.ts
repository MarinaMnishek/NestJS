import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import * as fs from 'fs';
import { Response } from 'express';
import { MyLogger } from '../logger/logger.service';
import { MailService } from '../../../mail/mail.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../database/entities/comment.entity';
import { CommentDTO } from '../../dto/comment.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,

    private readonly postsService: PostsService,
    private readonly mailService: MailService,
    private myLogger: MyLogger,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.myLogger.setContext('CommentsService');
  }

  async getComments(postId: number): Promise<CommentDTO[]> {
    const posts = await this.postsService.getPosts();
    return posts[postId].comments;
  }

  async getComment(postId: number, commentId: number): Promise<CommentDTO> {
    const posts = await this.postsService.getPosts();
    return posts[postId].comments[commentId];
  }

  async createComment(postId: number, data: CommentDTO): Promise<CommentDTO> {
    return this.commentsRepository.save({
      postId: postId,
      ...data,
    });
  }

  async saveFile(path: string, data: Buffer) {
    fs.writeFile(path, data, (error) => {
      if (error) throw new Error(error.message);
    });
  }

  async getFile(response: Response) {
    const buffer = fs.createReadStream('/Users/user/blog/files/receipt.pdf');
    this.myLogger.warn('About to return cats!');
    buffer.pipe(response).on('close', () => {
      buffer.destroy();
    });
  }

  async deleteComment(postId: number, commentId: number): Promise<Comment> {
    const posts = await this.postsService.getPosts();
    const post = posts[postId - 1];
    const comment = post.comments[commentId - 1];
    if (comment) {
      return this.commentsRepository.remove(comment);
    } else throw new Error('Comment not found');
  }

  async updateComment(postId: number, commentId: number, data: CommentDTO): Promise<CommentDTO> {
    const comment = await this.commentsRepository.findOne({
      where: {
         id: commentId,
      },
    });
    // console.log(comment?.text);
    this.eventEmitter.emit('comment.update', {
      commentId: commentId,
      postId: postId,
      });
      
    
    
    const messageUpdate = { 'last': comment?.text, 'now': data.text }
    await this.mailService.sendMessageUpdateComment('testmail188@mail.ru', messageUpdate)
    return this.commentsRepository.save({
      ...comment,
      ...data,
    });

  }


}
