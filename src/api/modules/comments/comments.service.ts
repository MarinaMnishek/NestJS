import { Injectable, StreamableFile } from '@nestjs/common';
import { Comments } from '../../dto/comments.dto';
import { PostsService } from '../posts/posts.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { MyLogger } from '../logger/loger.service';


@Injectable()
export class CommentsService {

  constructor(private readonly postsService: PostsService,
    private readonly logger: MyLogger ) {
      this.logger.setContext('CommentsService')
     }


    
  async getComments(postId: number): Promise<Comments[]> {
    const posts = await this.postsService.getPosts()
    return posts[postId].comments;
  }

  async getComment(postId: number, commentId: number): Promise<Comments | undefined> {
    const posts = await this.postsService.getPosts()
    const comments = posts[postId].comments
    return comments[commentId];

  }

  async createComment(postId: number, data: Comments): Promise<Comments> {
    const posts = await this.postsService.getPosts()
    posts[postId - 1].comments.push(data);
    return data;
  }

  async deleteComment(postId: number, commentId: number): Promise<Comments[]> {
    const posts = await this.postsService.getPosts()
    const post = posts[postId]
    const comments = post.comments
    const index = comments.findIndex(item => item.id == commentId)
    if (index >= 0) {
      comments.splice(index, 1);
      return comments;
    } else throw new Error('Comment not found');
  }

   async updateComment(postId: number, commentId: number, data: Comments): Promise<Comments> {
    const posts = await this.postsService.getPosts()
    const post = posts[postId - 1]
    const comments = post.comments
    const index = comments.findIndex(item => item.id == commentId)
    let existingComment = comments[index];
    existingComment = {
      ...existingComment,
      ...data,
    };
    comments[commentId - 1] = existingComment;
  
    return comments[commentId-1];

  }

  async assignFile(postId: number, commentId: number, path: string): Promise<void> {
    this.logger.warn('New pdf file assigned to post with id ' + postId + ' to comment with id ' + commentId);
    
    const posts = await this.postsService.getPosts()
   posts[postId - 1].comments[commentId-1].attachments = path;
    
  }

  // async getFile(postId: number, commentId: number): Promise<StreamableFile | undefined> {
  //   const posts = await this.postsService.getPosts()
  //   const path = posts[postId].comments[commentId].attachments;
  //   let file
  //   if (path) {file = createReadStream(join(process.cwd(), path));}
  //   if (file) return new StreamableFile(file);
    
  // }

  async getPath(postId: number, commentId: number): Promise<string | null> {
    const posts = await this.postsService.getPosts()
   return posts[postId].comments[commentId].attachments;
    
  }

}
