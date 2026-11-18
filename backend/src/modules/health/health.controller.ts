import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  check() {
    const { version } = this.database.db
      .prepare('select sqlite_version() as version')
      .get() as { version: string };

    return { status: 'ok', uptime: process.uptime(), sqlite: version };
  }
}
