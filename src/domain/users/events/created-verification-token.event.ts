import { DomainEvent } from "src/domain/shared/domain-events/domain-event";

export class CreatedVerificationTokenEvent implements DomainEvent {
  public occurredOn: Date;

  constructor(
    public readonly userId: string,
    public readonly userEmail: string,
    public readonly token: string,
    public readonly expiresAt: Date,
  ) {
    this.occurredOn = new Date();
  }
}