import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "src/domain/shared/base-entity";
import { User } from "./user.entity";

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Column({ unique: true })
  token: string

  @Column({ unique: true, name: 'refresh_token' })
  refreshToken: string

  @Column({ name: 'expires_at' })
  expiresAt: Date

  @OneToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: User
}