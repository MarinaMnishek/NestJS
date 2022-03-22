import { Injectable } from '@nestjs/common';
import { Posts } from './database/entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  async getPosts(): Promise<Posts[]> {
    const posts = this.postsRepository.find();
    return posts;
  }

  async getPost(id: number): Promise<Posts | undefined> {
    return this.postsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createPost(data: Posts): Promise<Posts[]> {
    await this.postsRepository.save(data);
    return this.postsRepository.find();
  }

  // async updatePost(data: Posts): Promise<Posts> {
  //   const existingPost = await this.postsRepository.findOne({
  //     where: {
  //       id: data.id,
  //     },
  //   });
  //   return this.postsRepository.save({
  //     ...existingPost,
  //     ...data,
  //   });
  // }

  async updatePost(id: number, data: Posts): Promise<Posts[]> {
    const existingPost = await this.postsRepository.findOne({
      where: {
        id
      },
    });
    await this.postsRepository.save({
      ...existingPost,
      ...data,
    });
    return this.postsRepository.find()
  }

  async deletePost(id: number): Promise<Posts[]> {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });
    if (post) {
      await this.postsRepository.remove(post);
      return this.postsRepository.find()
    }

    else throw new Error('Post not found');
  }
  // async deletePost(id: number): Promise<Posts> {
  //   const post = await this.postsRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (post) return this.postsRepository.remove(post);
  //   else throw new Error('Post not found');
  // }
}
