import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job, Queue } from 'bullmq';
import { MailtrapClient } from 'mailtrap';
import { SendEmailDto } from './dto/send-mail.dto';

@Injectable()
@Processor('email')
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private readonly client: MailtrapClient;
  private readonly sender: { email: string; name: string };

  constructor(
    private readonly configService: ConfigService,
    @InjectQueue('email') private readonly queue: Queue,
  ) {
    this.client = new MailtrapClient({
      token: this.configService.get('MAILTRAP_API_TOKEN'),
      testInboxId: this.configService.get('MAILTRAP_TEST_INBOX_ID'),
      accountId: this.configService.get('MAILTRAP_ACCOUNT_ID'),
    });

    this.sender = {
      email: this.configService.get('MAILTRAP_FROM_EMAIL'),
      name: this.configService.get('MAILTRAP_FROM_NAME'),
    };
  }

  async sendEmail(dto: {
    to: string[],
    subject: string,
    content: { text?: string; html?: string },
    category?: string,
  }) {
    await this.queue.add('send-email', dto);
  }

  @Process('send-email')
  protected async sendEmailJob(job: Job<SendEmailDto>) {
    try {
      if (!this.configService.get('MAILTRAP_TEST_INBOX_ID')) {
        this.logger.log(`Sending email to ${job.data.to.join(', ')}`);
        return await this.client.send({
          from: this.sender,
          to: job.data.to.map((email) => ({ email })),
          subject: job.data.subject,
          text: job.data.content.text,
          html: job.data.content.html,
          category: job.data.category,
        });
      }

      this.logger.log(`[TEST MODE] Sending email to ${job.data.to.join(', ')}`);
      await this.client.testing.send({
        from: this.sender,
        to: job.data.to.map((email) => ({ email })),
        subject: job.data.subject,
        text: job.data.content.text,
        html: job.data.content.html,
        category: job.data.category,
      });

    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`);
    }
  }
}