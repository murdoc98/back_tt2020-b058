import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import logger from 'logger';

export default async (): Promise<void> => {
  dotenv.config();
  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [__dirname + '/models/*.model.ts']
  })
  .then(() => {
    logger.info('Sql database connected');
  })
  .catch((err) => {
    logger.error(err);
    process.exit(0);
  });
  return;
};
