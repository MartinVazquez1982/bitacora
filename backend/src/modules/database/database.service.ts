import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  db: Database.Database;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const path =
      this.config.get<string>('DB_PATH') ?? './data/bitacora.sqlite';
    if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });

    this.db = new Database(path);
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('foreign_keys = ON');
  }

  onModuleDestroy() {
    this.db?.close();
  }
}
