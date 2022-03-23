import { Injectable } from '@nestjs/common';
import { Posts } from '../../dto/post.dto';

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
        createdAt: new Date(Date.now())
      },
      {
        id: 2,
        text: 'comment number two',
        createdAt: new Date(Date.now())
      }
    ]
  },
  {
    id: 2,
    name: 'two',
    description: 'first',
    text: 'first',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        id: 1,
        text: 'comment number one',
        createdAt: new Date(Date.now())
      },
      {
        id: 2,
        text: 'comment number two',
        createdAt: new Date(Date.now())
      },
      {
        id: 3,
        text: 'comment number three',
        createdAt: new Date(Date.now())
      },
      {
        id: 4,
        text: 'comment number four',
        createdAt: new Date(Date.now())
      }
    ]
  },
  {
    id: 3,
    name: 'three',
    description: 'three',
    text: 'three',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        id: 1,
        text: 'comment number one',
        createdAt: new Date(Date.now())
      },
      {
        id: 2,
        text: 'comment number two',
        createdAt: new Date(Date.now())
      }
    ]
  },
  {
    id: 4,
    name: 'four',
    description: 'four',
    text: 'four',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        id: 1,
        text: 'comment number one',
        createdAt: new Date(Date.now())
      },
      {
        id: 2,
        text: 'comment number two',
        createdAt: new Date(Date.now())
      }
    ]
  },
];

@Injectable()
export class PostsService {
  async getPosts(): Promise<Posts[]> {
    return posts;
  }

  async getPost(id: number): Promise<Posts | undefined> {
    return posts[id - 1];
  }

  async createPost(data: Posts): Promise<Posts> {
    posts.push(data);
    return data;
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
    const index = posts.findIndex(item => item.id==id)
    if (index >= 0) {
      posts.splice(index, 1);
      return posts;
    } else throw new Error('Post not found');
  }
}
