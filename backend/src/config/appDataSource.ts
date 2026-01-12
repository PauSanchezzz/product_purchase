import * as path from 'path';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { envOptions } from './env.options';

dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: envOptions.DB_HOST,
  port: parseInt(envOptions.DB_PORT || '5432'),
  username: envOptions.DB_USERNAME || 'postgres',
  password: envOptions.DB_PASSWORD || 'postgres',
  database: envOptions.DB_DATABASE || 'product_purchase',
  entities: [path.join(__dirname, '../../**/*.entity{.ts,.js}')],
  migrations: [
    path.join(__dirname, '../db/*.ts'),
  ],
  synchronize: false,
  logging: true,
};

const appDataSource = new DataSource(typeOrmConfig);
export default appDataSource;
