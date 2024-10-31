import { Injectable, Logger } from "@nestjs/common";
import { DataSource } from "typeorm";
import createDefaultUser from "./seeds/create-user.seed";

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger('Infrastructure:DatabaseService');

  constructor(
    private datasource: DataSource,
  ) { }

  runMigrations() {
    return this.datasource.runMigrations();
  }

  async runSeeds() {
    const seeders = [
      createDefaultUser,
    ]

    const initialTimestamp = Date.now();
    await this.datasource.transaction(async (manager) => {
      for (const seeder of seeders) {
        this.logger.log(`Running seed: ${seeder.name}`);
        const seedTimestamp = Date.now();
        await seeder(manager);
        this.logger.log(`Seed ${seeder.name} completed in ${Date.now() - seedTimestamp}ms`);
      }
    });

    this.logger.log(`All seeds completed in ${Date.now() - initialTimestamp}ms`);
  }
}