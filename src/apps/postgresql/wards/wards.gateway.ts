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
  namespace: 'wards',
  transports: ['websocket'],
})
export class WardsGateway {
  wardRequestSub = new BehaviorSubject<{ client: Socket; wardName: string }>({
    client: null,
    wardName: null,
  });

  @WebSocketServer()
  clientServer: Socket;

  @SubscribeMessage('request-ward')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() wardName: any,
  ) {
    this.wardRequestSub.next({ client: client, wardName });
  }

  notifyClientWardNameAccepted(clientId: string, wardName: string) {
    this.clientServer.emit(`ward-name-accepted ${clientId}`, wardName);
  }
}
