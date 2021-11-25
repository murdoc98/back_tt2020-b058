import dbConnection from 'dbConnection';
import fs from 'fs';
import path from 'path';

import Teacher from 'models/Teacher.model';
import Student from 'models/Student.model';
import Group from 'models/Group.model';
import Enrollment from 'models/Enrollment.model';
import Question from 'models/Question.schema';

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

const group1 = new Group({
  name: '5to A',
  teacherId: teacher1
});
const enroll1 = new Enrollment({
  student: student1,
  group: group1
});
const enroll2 = new Enrollment({
  student: student2,
  group: group1
});
enroll2.status = true;

const question1 = new Question({
  statement: 'Esto es una prueba',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Numeros',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});

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
    await group1.save();
    logger.info('Groups created');
    await enroll1.save();
    await enroll2.save();
    logger.info('Enrolls created');
    await question1.save();
    logger.info('Questions created');
    return;
  } catch(err) {
    logger.error(err);
  }
};

seed();