import { Global, Module } from "@nestjs/common";
import { DomainEventsSubscriber } from "./domain-events/domain-events-subscriber";
import { DomainEventsPublisher } from "./domain-events/domain-events-publisher";
import { DomainEventsStore } from "./domain-events/domain-events-store";

@Global()
@Module({
  providers: [
    DomainEventsSubscriber,
    DomainEventsPublisher,
    DomainEventsStore,
  ],
})
export class SharedModule { }