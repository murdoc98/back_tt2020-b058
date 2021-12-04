import logger from 'logger';
import createServer from 'server';
import sqlConnection from 'sqlConnection';
import nosqlConnection from 'nosqlConnection';
import Question from 'models/Question.schema';

const startServer = async () => {
  const app = createServer();
  await sqlConnection();
  await nosqlConnection();
  const questions = await Question.find();
  console.dir(questions, {depth:null});
  app.listen(app.get('PORT'), () => {
    logger.warn(`Server running on port ${app.get('PORT')}`);
  });
};

startServer();
