import { Injectable } from '@nestjs/common';
import { News } from './dto/news.dto';

const news: News[] = [
  {
    id: 1,
    name: 'first',
    description: 'first',
    text: 'first',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

@Injectable()
export class AppService {
  async getNews(): Promise<News[]> {
    console.log(news);
    return news;
  }

  async getNewsItem(id: number): Promise<News | undefined> {
    const index = news.findIndex(item => item.id== id)
    return news[index];
  }

  async createNews(data: News): Promise<News> {
    news.push(data);
    return data;
  }

  async updateNews(data: News): Promise<News> {
    const index = news.findIndex(item => item.id== data.id)
    let existingNews = news[index];
    existingNews = {
      ...existingNews,
      ...data,
    };
    const id_ = data.id-1
    news[id_] = existingNews;
    return news[data.id];

  }

  async deleteNews(id: number): Promise<News[]> {
    const index = news.findIndex(item => item.id==id)
    if (index >= 0) {
      news.splice(index, 1);
      return news;
    } else throw new Error('Post not found');
  }
}
