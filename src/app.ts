import logger from 'logger';
import createServer from 'server';
import dbConnection from 'dbConnection';
import Question from 'models/Question.schema';

const startServer = async () => {
  const app = createServer();
  await dbConnection();
  const books = await Question.find({});
  app.listen(app.get('PORT'), () => {
    console.log(books);
    logger.info(`Server running on port ${app.get('PORT')}`);
  });
};

startServer();
