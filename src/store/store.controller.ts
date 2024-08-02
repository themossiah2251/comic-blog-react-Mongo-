import { Controller, Get, Query, Logger } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  private readonly logger = new Logger(StoreController.name);

  constructor(private readonly storeService: StoreService) {}

  @Get()
  async findStores(@Query('query') query: string): Promise<any> {
    this.logger.log(`Received query: ${query}`);
    return this.storeService.findStores(query);
  }
}
