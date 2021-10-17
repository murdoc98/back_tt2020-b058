import dbConnection from 'dbConnection';
import fs from 'fs';
import path from 'path';

import Teacher from 'models/Teacher.model';
import Student from 'models/Student.model';
import logger from 'logger';

// Creating students
const student1 = new Student({
  name: 'Oscar',
  surname: 'Martinez',
  secondSurname: 'Vazquez',
  email: 'oscarmartinez1998lol@gmail.com'
});
student1.setPassword('thisIsAtest98!');
const student2 = new Student({
  name: 'Jose',
  surname: 'Rivera',
  secondSurname: 'Ramirez',
  email: 'john@example.com'
});
student2.setPassword('thisIsAtest98!');
const student3 = new Student({
  name: 'Jesus',
  surname: 'Montesinos',
  secondSurname: 'Correa',
  email: 'doe@example.com'
});
student3.setPassword('thisIsAtest98!');

// Creating teachers
const teacher1 = new Teacher({
  name: 'Arturo',
  surname: 'Jacome',
  secondSurname: 'Portillo',
  email: 'oscarmartinez1998@hotmail.es'
});
teacher1.setPassword('thisIsAtest98!');
const teacher2 = new Teacher({
  name: 'Genaro',
  surname: 'Juarez',
  secondSurname: 'Martinez',
  email: 'murdocw98@gmail.com'
});
teacher2.setPassword('thisIsAtest98!');

const seed = async () => {
  try {
    if (!fs.existsSync(path.resolve(__dirname, '../../files'))) {
      fs.mkdirSync(path.resolve(__dirname, '../../files'));
    }
    await dbConnection();
    logger.info('Creating seed records');
    await student1.save();
    await student2.save();
    await student3.save();
    logger.info('Students created');
    await teacher1.save();
    await teacher2.save();
    logger.info('Teachers created');
    return;
  } catch(err) {
    logger.error(err);
  }
};

seed();