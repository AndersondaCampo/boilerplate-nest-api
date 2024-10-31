import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig();

const config = {
  type: 'postgres',
  url: `${process.env.DATABASE_URL}`,
  entities: [__dirname + '/../entities/*{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  seeds: [__dirname + '/seeds/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
  logging: true
}

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);