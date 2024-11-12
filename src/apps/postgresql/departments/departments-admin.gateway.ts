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
  namespace: 'departments-admin',
  transports: ['websocket'],
})
export class DepartmentsAdminGateway {
  departmentAcceptedSub = new BehaviorSubject<{
    adminClient: Socket;
    clientId: string;
    departmentName: string;
  }>({
    adminClient: null,
    clientId: null,
    departmentName: null,
  });

  @WebSocketServer()
  adminServer: Socket;

  @SubscribeMessage('accept-department-name')
  acceptWardName(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { clientId: string; departmentName: string },
  ) {
    this.departmentAcceptedSub.next({
      adminClient: client,
      clientId: payload.clientId,
      departmentName: payload.departmentName,
    });
  }

  sendDepartmentRequestToAdminPortal(clientId: string, departmentName: string) {
    this.adminServer.emit('incoming-departmentprequest', {
      clientId,
      departmentName,
    });
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.query.token as string;
    console.log(token);

    if (token !== '123') {
      console.log('invalid token');
      client.disconnect(true);
      return;
    }
  }
}
