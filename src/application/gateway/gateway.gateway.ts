import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ transports: ['websocket'] })
export class GatewayGateway { }
