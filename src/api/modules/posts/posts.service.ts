import { Injectable } from '@nestjs/common';
import { Posts, CreatePost } from '../../dto/post.dto';
import { UserInfo } from '../../dto/user.dto';

const posts: Posts[] = [
  {
    id: 1,
    name: 'one',
    description: 'one',
    text: 'one',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        id: 1,
        text: 'comment number one',
        createdAt: new Date(Date.now()),
        attachments: null
      },
      {
        id: 2,
        text: 'comment number two',
        createdAt: new Date(Date.now()),
        attachments: null
      }
    ],
    // userInfo: {
    //   userName: 'Ivan',
    //   userEmail: '123@123.ru'
    // }

    userName: 'Ivan',
    userEmail: '123@123.ru'
  }
];

let postId = 2;

@Injectable()
export class PostsService {
  async getPosts(): Promise<Posts[]> {
    return posts;
  }

  async getPost(id: number): Promise<Posts | undefined> {
    return posts[id - 1];
  }

  async createPost(data: CreatePost): Promise<Posts> {
       
    const post: Posts = {
      ...data,
      id: postId++,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      
    }
    posts.push(post);
    return post;
  }

  async updatePost(data: Posts): Promise<Posts> {
    let existingPost = posts[data.id];
    existingPost = {
      ...existingPost,
      ...data,
    };
    posts[data.id] = existingPost;
    return posts[data.id];
  }

  async deletePost(id: number): Promise<Posts[]> {
    const index = posts.findIndex(item => item.id == id)
    if (index >= 0) {
      posts.splice(index, 1);
      return posts;
    } else throw new Error('Post not found');
  }
}
