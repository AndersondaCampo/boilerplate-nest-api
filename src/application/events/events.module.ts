import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { EventHandlers } from "./event-handlers";
import { EmailModule } from "src/integrations/email/email.module";

@Module({
  imports: [
    BullModule.registerQueue({ name: "auth" }),

    EmailModule,
  ],
  providers: [
    ...EventHandlers,
  ],
  exports: [],
})
export class EventsModule { }