import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PostsService } from '../../posts/posts.service';
import { CommentsService } from '../../comments/comments.service';
import { AuthService } from '../../../auth/auth.service';
import { OnEvent } from '@nestjs/event-emitter';
import { log } from 'console';
import { CommentDTO } from '../../../dto/comment.dto';

@WebSocketGateway({ namespace: '/chat' })
export class ChatGateway implements OnGatewayInit {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
    private readonly authService: AuthService,
  ) { }

  @WebSocketServer()
  wss!: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('chatToServer')
  async handleMessage(
    client: Socket,
    message: {
      sender: string;
      room: string;
      password: string;
      message: string;
    },
  ) {
    const post = await this.postsService.getPostByName(message.room);
    const id = post?.id;

    if (id)
      await this.commentsService.createComment(id, {
        text: message.message,
        createdAt: new Date(Date.now()),
        autor: message.sender,
      });

    if (message.password != 'pass') client.emit('error', 'Wrong password');

    this.wss.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  async handleRoomJoin(client: Socket, room: string) {
    console.log('client connected to room ' + room)
    client.join(room);

    const post = await this.postsService.getPostByName(room);
    console.log('post')
    console.log(post)
    console.log(post?.comments)
    if (post?.comments) {
      for (const iterator of post?.comments) {
        console.log('iterator')
        console.log(iterator)
        client.emit('getComments', {
          message: iterator.text,
          sender: iterator.autor,
          room: room,
          postId: iterator.postId,
          commentId: iterator.id
        });
      }
    }
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('login')
  async login(client: Socket, data: string[]) {
    let token;
    try {
      token = await this.authService.login({
        login: data[0],
        password: data[1],
      });
      console.log(token);
    } catch (error) { }
    client.emit('logIn', !!token);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  @OnEvent('comment.update')
  listentToEventUpdateComment(payload: any): void {
    console.log('Message Received Update: ', payload);
    this.wss.send().emit('commentUpdated', payload);
  }

  
  @OnEvent('comment.delete')
  listentToEventDeleteComment(payload: any): void {
    console.log('Message Received Delete: ', payload);
    this.wss.send().emit('commentDeleted', payload);
  }
}
