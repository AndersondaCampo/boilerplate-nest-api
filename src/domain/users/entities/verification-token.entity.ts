import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AggregateRoot } from "src/domain/shared/aggregate-root";
import { User } from "./user.entity";

@Entity({ name: 'verification_tokens' })
export class VerificationToken extends AggregateRoot {
  @Column({ unique: true })
  token: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @OneToOne(() => User, user => user.verificationTokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}