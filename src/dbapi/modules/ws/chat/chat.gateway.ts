import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, } from '@nestjs/websockets';
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
  async handleMessage(client: Socket, message: { sender: string, room: string, password: string, message: string }) {
    const post = await this.postsService.getPostByName(message.room)
    const id = post?.id

    if (id)
      await this.commentsService.createComment(id, { text: message.message, createdAt: new Date(Date.now()), autor: message.sender })


    if (message.password != 'pass') client.emit('error', "Wrong password");

    this.wss.to(message.room).emit('chatToClient', message);
  }

  // @SubscribeMessage('joinRoom')
  // async handleRoomJoin(client: Socket, room: string) {
  //   client.join(room);

  //   const post = await this.postsService.getPostByName(room)
  //   if (post?.comments) {
  //     for (const iterator of post?.comments) {
  //       setInterval(()=>{
  //         client.emit('getComments', { message: iterator.text, sender: iterator.autor, room: room });
  //       },500)

  //     }
  //   }
  //   client.emit('joinedRoom', room);
  // }

  @SubscribeMessage('joinRoom')
  async handleRoomJoin(client: Socket, room: string) {
    client.join(room);

    const post = await this.postsService.getPostByName(room)
    if (post?.comments) {
      for (const iterator of post?.comments) {
        client.emit('getComments', { message: iterator.text, sender: iterator.autor, room: room });
      }
    }
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('login')
  async login(client: Socket, data: string[]) {
    let token
    try {
      token = await this.authService.login({ login: data[0], password: data[1] })
      console.log(token)
    } catch (error) {
    }
    client.emit('logIn', !!token);
  }


  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  // @OnEvent('comment.update')
  //  async handleUpdateComment(client: Socket, message: { sender: string, room: string, password: string, message: string }) {
  //   const post = await this.postsService.getPostByName(message.room)
  //   const id = post?.id
  //   const updateComment = await this.commentsService.updateComment( id, { text: message.message, createdAt: new Date(Date.now()), autor: message.sender })

  // }

  // @OnEvent('comment.update')
  // async handleUpdateComment(client: Socket, payload:any) {
  //   console.log('33333333333333', payload)
  //   const { commentId, postId, data } = payload;
  //   const updateComment = await this.commentsService.updateComment(postId, commentId, data)
  //   console.log('111111111111111111111111')
  //   console.log(updateComment)

  //   client.emit('commentUpdate', updateComment);


  // }

}
