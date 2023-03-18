import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/generate')
  async generateMockData() {
    return await this.appService.generateMockData();
  }
}
