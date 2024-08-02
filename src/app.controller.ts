import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
@Controller()
export class AppController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('db-status')
  getDbStatus() {
    const state = this.connection.readyState;
    let status = 'disconnected';
    if (state === 1) {
      status = 'connected';
    } else if (state === 2) {
      status = 'connecting';
    } else if (state === 3) {
      status = 'disconnecting';
    }
    return { status };
  }
}
