import { Injectable } from '@nestjs/common';
import { Comments } from '../../dto/comments.dto';
import { PostsService } from '../posts/posts.service';



@Injectable()
export class CommentsService {

  constructor(private readonly postsService: PostsService) { }

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

  // async deleteComment(postId: number, commentId: number): Promise<Comments[]> {
  //   const posts = await this.postsService.getPosts()
  //   const post = posts[postId - 1]
  //   const comments = post.comments
  //   const index = comments.findIndex(item => item.id == commentId)
  //   if (index >= 0) {
  //     comments.splice(index, 1);
  //     return comments;
  //   } else throw new Error('Comment not found');
  // }

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

}
