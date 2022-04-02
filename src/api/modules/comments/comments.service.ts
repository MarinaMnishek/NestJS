import { Injectable } from '@nestjs/common';
import { CommentDTO } from '../../../api/dto/comment.dto';
import { PostsDTO } from '../../dto/post.dto';
import { PostsService } from '../posts/posts.service';
import * as fs from 'fs';
import { Response } from 'express';
import { MyLogger } from '../logger/logger.service';
import { MailService } from '../../../mail/mail.service';


let commentId = 3;
@Injectable()
export class CommentsService {
  constructor(
    private readonly postsService: PostsService,
    private readonly mailService: MailService,
    private myLogger: MyLogger,
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
    const comment: CommentDTO = {
      ...data,
      id: commentId++,
      createdAt: new Date(Date.now())

    }

    await this.mailService.sendMessage('testmail188@mail.ru')
    const posts = await this.postsService.getPosts()

    posts[postId].comments.push(comment);

    return data;

  }

  async deleteComment(postId: number, commentId: number): Promise<PostsDTO[]> {

    const posts = await this.postsService.getPosts()
    const post = posts[postId - 1]
    console.log(posts[postId - 1]);

    const comments = post.comments
    const index = comments.findIndex(item => item.id == commentId)
    if (index >= 0) {
      comments.splice(index, 1);
      return posts;
    } else throw new Error('Comment not found');
  }

  async updateComment(postId: number, commentId: number, data: CommentDTO): Promise<CommentDTO> {
    const posts = await this.postsService.getPosts()
    const post = posts[postId - 1]
    const comments = post.comments
    const index = comments.findIndex(item => item.id == commentId)
    const commentLast = comments[index].text
    let existingComment = comments[index];
    existingComment = {
      ...existingComment,
      ...data,
    };
    comments[commentId - 1] = existingComment;
    const messageUpdate = { 'last': commentLast, 'now': comments[commentId - 1].text }
    await this.mailService.sendMessageUpdateComment('testmail188@mail.ru', messageUpdate)
    return comments[commentId - 1];

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
