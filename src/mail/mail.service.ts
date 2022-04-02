import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { CommentDTO } from '../api/dto/comment.dto';


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }


  async sendMessage(addressTo: string) {
    return this.mailerService
      .sendMail({
        to: addressTo,
        subject: 'Создание нового комментария!',
        template: 'test',
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  async sendMessageUpdateComment(addressTo: string, messageUpdate: object) {


    return this.mailerService
      .sendMail({
        to: addressTo,
        subject: 'Update комментария!',
        template: 'updateComment',
        context: messageUpdate,
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

}
