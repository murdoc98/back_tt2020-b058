import { createConnection } from 'typeorm';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from 'logger';

export default async (): Promise<void> => {
  dotenv.config();
  const nsqlURI = `mongodb://localhost:${process.env.NDB_PORT}/questions`;
  mongoose.connect(nsqlURI);
  const db = mongoose.connection
  db.on("error", (err) => {
    logger.error(err);
  });
  db.on('connected', (err, res) => {
    logger.info('No sql database connected');
  });
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
