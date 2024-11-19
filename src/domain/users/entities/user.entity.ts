import { AfterLoad, Column, Entity, OneToMany } from "typeorm";
import { Session } from "./session.entity";
import { VerificationToken } from "./verification-token.entity";
import { AggregateRoot } from "src/domain/shared/aggregate-root";

@Entity({ name: 'users' })
export class User extends AggregateRoot {
  @Column({ unique: true })
  email: string;

  @Column({ default: false, name: 'email_verified' })
  emailVerified: boolean;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Session, session => session.user, {
    cascade: true,
    eager: true,
  })
  sessions: Session[];

  @OneToMany(() => VerificationToken, verificationToken => verificationToken.user, {
    cascade: true,
    eager: true,
  })
  verificationTokens: VerificationToken[];

  @AfterLoad()
  protected afterLoad() {
    this.sessions = this.sessions ?? [];
    this.verificationTokens = this.verificationTokens ?? [];
  }
}