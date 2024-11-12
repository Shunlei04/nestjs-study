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
  namespace: 'departments',
  transports: ['websocket'],
})
export class DepartmentsGateway {
  departmentRequestSub = new BehaviorSubject<{
    client: Socket;
    departmentName: string;
  }>({
    client: null,
    departmentName: null,
  });

  @WebSocketServer()
  clientServer: Socket;

  @SubscribeMessage('request-department')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() departmentName: any,
  ) {
    this.departmentRequestSub.next({ client: client, departmentName });
  }

  notifyClientDepartmentNameAccepted(clientId: string, departmentName: string) {
    this.clientServer.emit(
      `department-name-accepted ${clientId}`,
      departmentName,
    );
  }
}
