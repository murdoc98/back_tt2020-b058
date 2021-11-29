import mongoose from 'mongoose';
import logger from 'logger';
import dotenv from 'dotenv';


export default async() => {
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
}