import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://testmail188@mail.ru:BQU1G7nEMhaJ2iifjsp1@smtp.mail.ru',
      defaults: {
        from: '"NestJS робот" <testmail188@mail.ru>',
      },
      template: {
        dir: join(__dirname, '../..', 'views/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
