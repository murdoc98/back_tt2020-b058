import sqlConnection from 'sqlConnection';
import nosqlConnection from 'nosqlConnection';
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
  statement: 'Ordena de mayor a menor los siguientes numeros: $1, $2, $3, $4',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Numeros',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question2 = new Question({
  statement: 'Convierte la siguiente fracción a notación decimal $1, $2',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Numeros',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question3 = new Question({
  statement: 'Convierte el siguiente número decimal a fraccion $1',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Numeros',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question4 = new Question({
  statement: 'Realiza la siguiente operación y expresa el resultado en decimal $1, $2, $3',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Números, adición y sustracción',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question5 = new Question({
  statement: 'Realiza la siguiente operación y expresa el resultado en fracción $1, $2, $3',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Números, adición y sustracción',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question6 = new Question({
  statement: 'Si un trabajador tarda $1 minutos en fabricar $2 ladrillos, cuánto tardará en crear $3 ladrillos',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Proporcionalidad, numeración, adición y sustracción.',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question7 = new Question({
  statement: 'Si $1 kilos de tortillas vale $1 cuánto valdrán $3 kilos de tortillas?',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Proporcionalidad, numeración, adición y sustracción.',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question8 = new Question({
  statement: 'Resolver la siguiente ecuacion lineal x $1 = $2',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Proporcionalidad, numeración, adición y sustracción.',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question9 = new Question({
  statement: 'Encuentra los valores de Y para los siguiente valores f(y) = $1',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Proporcionalidad, numeración, adición y sustracción.',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question10 = new Question({
  statement: 'Aplica el teorema de tales de Mileto para calcular la variable faltante',
  general_topic: 'Figuras y cuerpos.',
  topic: 'Forma, espacio y medida.',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question11 = new Question({
  statement: 'Calcula el area de la siguiente figura, donde x = $1',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question12 = new Question({
  statement: 'Calcula el perimetro de la siguiente figura, donde x = $1',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question13 = new Question({
  statement: 'Calcula el volumen de la siguiente figura, donde x = $1',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question14 = new Question({
  statement: 'Obtén la media aritmética del siguiente conjunto de datos: $1, $2, $3, $4, $5',
  general_topic: 'Estadistica',
  topic: 'Analisis de datos',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question15 = new Question({
  statement: 'Obtén la mediana del siguiente conjunto de datos: $1, $2, $3, $4, $5',
  general_topic: 'Estadistica',
  topic: 'Analisis de datos',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});
const question16 = new Question({
  statement: 'Obtén la moda del siguiente conjunto de datos: $1, $2, $3, $4, $5',
  general_topic: 'Estadistica',
  topic: 'Analisis de datos',
  description: 'Los números pueden ser decimales o fracciones',
  image: null
});

const seed = async () => {
  try {
    if (!fs.existsSync(path.resolve(__dirname, '../../files'))) {
      fs.mkdirSync(path.resolve(__dirname, '../../files'));
    }
    await sqlConnection();
    await nosqlConnection();
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
    await question2.save();
    await question3.save();
    await question4.save();
    await question5.save();
    await question6.save();
    await question7.save();
    await question8.save();
    await question9.save();
    await question10.save();
    await question11.save();
    await question12.save();
    await question13.save();
    await question14.save();
    await question15.save();
    await question16.save();
    logger.info('Questions created');
    process.exit(0);
  } catch(err) {
    logger.error(err);
  }
};

seed();
