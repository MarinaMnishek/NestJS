import { Injectable } from '@nestjs/common';
import { CommentDTO } from '../../dto/comment.dto';
import { PostsService } from '../posts/posts.service';
import * as fs from 'fs';
import { Response } from 'express';
import { MyLogger } from '../logger/logger.service';
import { MailService } from '../../../mail/mail.service';
import { Comment } from '../../database/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'




@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly postsService: PostsService,
    private readonly mailService: MailService,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext('CommentsService');
  }

  async getComments(id: number): Promise<CommentDTO[]> {
    const posts = await this.postsService.getPosts();
    return posts[id].comments;
  }

  async getComment(postId: number, commentId: number): Promise<CommentDTO | undefined | any> {
    return this.commentsRepository.findOne({
      where: {
         id: commentId,
      },
    });
   
  }

  async createComment(postId: number, data: CommentDTO): Promise<CommentDTO> {
    await this.mailService.sendMessage('testmail188@mail.ru');
    const posts = await this.postsService.getPosts()
    
    return this.commentsRepository.save({
      postId: postId,
      ...data
    });
  }

   
  async deleteComment(postId: number, commentId: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      
      where: {
        id: commentId,
      },
    });
    if (comment) return this.commentsRepository.remove(comment);
    else throw new Error('comment not found');
   
  }

  async updateComment(postId: number, commentId: number, data: CommentDTO): Promise<CommentDTO> {
    const comment = await this.commentsRepository.findOne({
      where: {
         id: commentId,
      },
    });
    console.log(comment?.text);
    
    
    const messageUpdate = { 'last': comment?.text, 'now': data.text }
    await this.mailService.sendMessageUpdateComment('testmail188@mail.ru', messageUpdate)
    return this.commentsRepository.save({
      ...comment,
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
}
