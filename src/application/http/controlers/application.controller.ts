import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApplicationController {
  @Get()
  getHello(): string {
    return 'API is running!';
  }
}
