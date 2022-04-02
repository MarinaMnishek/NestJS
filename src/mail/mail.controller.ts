import { Controller, Get } from '@nestjs/common';
import { CommentDTO } from 'src/api/dto/comment.dto';
import { MailService } from './mail.service';
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }
  @Get()

  async sendTestEmail() {
    return await this.mailService.sendMessage('testmail188@mail.ru');
  }


}