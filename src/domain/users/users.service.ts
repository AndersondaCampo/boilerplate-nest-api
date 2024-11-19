import { Injectable, NotFoundException } from '@nestjs/common';
import { Filter } from '../shared/apply-filters';
import { UsersRepository } from './users.repository';

import * as crypto from 'node:crypto';
import * as moment from 'moment';
import { VerificationToken } from './entities/verification-token.entity';
import { CreatedVerificationTokenEvent } from './events/created-verification-token.event';
import { Session } from './entities/session.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: UsersRepository,
  ) { }

  async findAll(filter?: Filter) {
    return await this.repository.filterAll(filter);
  }

  async findByIdOrEmail(dto: { id?: string; email?: string }) {
    let filter: Filter = {};
    if (dto.id) {
      filter = { id: dto.id };
    } else if (dto.email) {
      filter = { email: dto.email };
    }

    const user = await this.repository.filterOne(filter);
    return user;
  }

  async create(dto: { email: string; name?: string }) {
    const user = this.repository.create(dto);
    await this.repository.save(user);
    return user;
  }

  async update(dto: { id: string; email: string; name: string }) {
    const user = await this.findByIdOrEmail({ id: dto.id });
    user.email = dto.email;
    user.name = dto.name;
    await this.repository.save(user);
    return user;
  }

  async createVerificationToken(email: string) {
    const expiration = moment().add(1, 'hour').toDate();
    const token = crypto.randomBytes(32).toString('hex');
    const user = await this.repository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const verificationToken = this.repository.manager.create(
      VerificationToken,
      {
        id: user.id,
        token,
        expiresAt: expiration,
      },
    );

    verificationToken.domainEvents.push(
      new CreatedVerificationTokenEvent(
        user.id,
        user.email,
        verificationToken.token,
        verificationToken.expiresAt,
      ),
    );

    user.verificationTokens = [...user.verificationTokens, verificationToken];

    await this.repository.save(user);
  }

  async verifyEmail({ email, token }: { email: string, token: string }) {
    const user = await this.repository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const verificationToken = user.verificationTokens.find(
      (vt) => vt.token === token,
    );

    if (!verificationToken) {
      return null;
    }

    if (verificationToken.expiresAt < new Date()) {
      return null;
    }

    const jwt = this.jwtService.sign({ id: user.id });
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d' },
    );

    const session = this.repository.manager.create(Session, {
      user,
      token: jwt,
      refreshToken,
      expiresAt: moment().add(1, 'day').toDate(),
    });

    user.sessions = [...user.sessions, session];
    user.emailVerified = true;
    await this.repository.save(user);

    return {
      user: {
        id: user.id,
        email: user.email,
      },
      session: {
        id: session.id,
        token: jwt,
        refreshToken,
        expiresAt: session.expiresAt,
      },
    };
  }
}
