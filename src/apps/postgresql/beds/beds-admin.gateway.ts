import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'beds-admin',
  transports: ['websocket'],
})
export class BedsAdminGateway {
  bedNoAcceptedSub = new BehaviorSubject<{
    clientId: string;
    adminClient: Socket;
    bedNo: string;
  }>({
    clientId: null,
    adminClient: null,
    bedNo: null,
  });

  @WebSocketServer()
  adminServer: Socket;

  @SubscribeMessage('accept-bed-no')
  acceptBedNo(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { clientId: string; bedNo: string },
  ) {
    this.bedNoAcceptedSub.next({
      adminClient: client,
      clientId: payload.clientId,
      bedNo: payload.bedNo,
    });
  }

  sendBedRequestToAdminPortal(clientId: string, bedNo: string) {
    this.adminServer.emit('incoming-bedprequest', { clientId, bedNo });
  }

  handleconnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.query.token;
    console.log(token);

    if (token != '123') {
      console.log('invalid token');
      client.disconnect(true);
      return;
    }
  }
}
