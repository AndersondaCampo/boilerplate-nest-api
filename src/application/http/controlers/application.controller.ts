import { Controller, Inject, Get, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Registry, Gauge } from 'prom-client';

type QueueMetrics = {
  awaiting: Gauge<string>;
  active: Gauge<string>;
  completed: Gauge<string>;
  failed: Gauge<string>;
};

@Controller()
export class ApplicationController implements OnModuleInit {
  private registry: Registry;
  private queueMetrics: QueueMetrics;
  private authQueueMetrics: QueueMetrics;
  private emailQueueMetrics: QueueMetrics;

  constructor(
    @InjectQueue('auth') private readonly authQueue: Queue,
    @InjectQueue('email') private readonly emailQueue: Queue,
  ) { }

  @Get()
  getHello(): string {
    return 'API is running!';
  }

  @Get('metrics')
  async getMetrics() {
    const authQueueMetrics = await this.authQueue.getJobCounts();
    const emailQueueMetrics = await this.emailQueue.getJobCounts();

    this.queueMetrics.awaiting.set(authQueueMetrics.waiting + emailQueueMetrics.waiting);
    this.queueMetrics.active.set(authQueueMetrics.active + emailQueueMetrics.active);
    this.queueMetrics.completed.set(authQueueMetrics.completed + emailQueueMetrics.completed);
    this.queueMetrics.failed.set(authQueueMetrics.failed + emailQueueMetrics.failed);

    this.authQueueMetrics.awaiting.set(authQueueMetrics.waiting);
    this.authQueueMetrics.active.set(authQueueMetrics.active);
    this.authQueueMetrics.completed.set(authQueueMetrics.completed);
    this.authQueueMetrics.failed.set(authQueueMetrics.failed);

    this.emailQueueMetrics.awaiting.set(emailQueueMetrics.waiting);
    this.emailQueueMetrics.active.set(emailQueueMetrics.active);
    this.emailQueueMetrics.completed.set(emailQueueMetrics.completed);
    this.emailQueueMetrics.failed.set(emailQueueMetrics.failed);

    return this.registry.metrics();
  }

  onModuleInit() {
    this.registry = new Registry();

    this.queueMetrics = {
      awaiting: new Gauge({
        name: 'bull_queue_awaiting',
        help: 'Number of jobs awaiting',
      }),
      active: new Gauge({
        name: 'bull_queue_active',
        help: 'Number of jobs active',
      }),
      completed: new Gauge({
        name: 'bull_queue_completed',
        help: 'Number of jobs completed',
      }),
      failed: new Gauge({
        name: 'bull_queue_failed',
        help: 'Number of jobs failed',
      }),
    };

    this.authQueueMetrics = {
      awaiting: new Gauge({
        name: 'bull_auth_queue_awaiting',
        help: 'Number of jobs awaiting in auth queue',
      }),
      active: new Gauge({
        name: 'bull_auth_queue_active',
        help: 'Number of jobs active in auth queue',
      }),
      completed: new Gauge({
        name: 'bull_auth_queue_completed',
        help: 'Number of jobs completed in auth queue',
      }),
      failed: new Gauge({
        name: 'bull_auth_queue_failed',
        help: 'Number of jobs failed in auth queue',
      }),
    };

    this.emailQueueMetrics = {
      awaiting: new Gauge({
        name: 'bull_email_queue_awaiting',
        help: 'Number of jobs awaiting in email queue',
      }),
      active: new Gauge({
        name: 'bull_email_queue_active',
        help: 'Number of jobs active in email queue',
      }),
      completed: new Gauge({
        name: 'bull_email_queue_completed',
        help: 'Number of jobs completed in email queue',
      }),
      failed: new Gauge({
        name: 'bull_email_queue_failed',
        help: 'Number of jobs failed in email queue',
      }),
    };

    this.registry.registerMetric(this.queueMetrics.awaiting);
    this.registry.registerMetric(this.queueMetrics.active);
    this.registry.registerMetric(this.queueMetrics.completed);
    this.registry.registerMetric(this.queueMetrics.failed);

    this.registry.registerMetric(this.authQueueMetrics.awaiting);
    this.registry.registerMetric(this.authQueueMetrics.active);
    this.registry.registerMetric(this.authQueueMetrics.completed);
    this.registry.registerMetric(this.authQueueMetrics.failed);

    this.registry.registerMetric(this.emailQueueMetrics.awaiting);
    this.registry.registerMetric(this.emailQueueMetrics.active);
    this.registry.registerMetric(this.emailQueueMetrics.completed);
    this.registry.registerMetric(this.emailQueueMetrics.failed);
  }
}
