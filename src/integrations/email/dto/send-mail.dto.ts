//   from: this.sender,
//   to: dto.to.map((email) => ({ email })),
//   subject: dto.subject,
//   text: dto.content.text,
//   html: dto.content.html,
//   category: dto.category,
// })

import { IsEmail, IsObject, IsOptional, IsString, validateOrReject } from "class-validator";


class SendMailContentDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  html?: string;
}

export class SendEmailDto {
  constructor(
    to: string[],
    subject: string,
    content: SendMailContentDto,
    category?: string,
  ) {
    this.to = to;
    this.subject = subject;
    this.content = content;
    this.category = category;

    if (arguments.length) {
      validateOrReject(this);
    }
  }

  @IsEmail({}, { each: true })
  to: string[];

  @IsString()
  subject: string;

  @IsObject()
  content: SendMailContentDto;

  @IsOptional()
  @IsString()
  category?: string;
}