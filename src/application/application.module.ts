import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { GatewayModule } from './gateway/gateway.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    HttpModule,
    GatewayModule,

    // Application events
    EventsModule,
  ],
  providers: [],
  controllers: [],
})
export class ApplicationModule { }
