import sqlConnection from 'sqlConnection';
import nosqlConnection from 'nosqlConnection';
import fs from 'fs';
import path from 'path';

// Question 7, 8 y 9

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
  name: 'Arturo',
  surname: 'Jacome',
  secondSurname: 'Portillo',
  email: 'a.m.jacomep@hotmail.com'
});
student2.setPassword('InfinitumGG9620!');
const student3 = new Student({
  name: 'Jesus',
  surname: 'Montesinos',
  secondSurname: 'Correa',
  email: 'doe@example.com'
});
student3.setPassword('thisIsAtest98!');
const student4 = new Student({
  name: 'Josue',
  surname: 'Hernandez',
  secondSurname: 'Espinoza',
  email: 'jane@doe.com'
});
student4.setPassword('thisIsAtest98!');
const student5 = new Student({
  name: 'Luis Fernando',
  surname: 'Mendoza',
  secondSurname: 'Betancourt',
  email: 'jupiter@doe.com'
});
student5.setPassword('thisIsAtest98!');
const student6 = new Student({
  name: 'Ricardo',
  surname: 'Flores',
  secondSurname: 'Hernandez',
  email: 'random@doe.com'
});
student6.setPassword('thisIsAtest98!');
const student7 = new Student({
  name: 'Alejandra',
  surname: 'Mendoza',
  secondSurname: 'Ramirez',
  email: 'missing@doe.com'
});
student7.setPassword('thisIsAtest98!');
const student8 = new Student({
  name: 'Mariana',
  surname: 'Gutierrez',
  secondSurname: 'Hernandez',
  email: 'dream@doe.com'
});
student8.setPassword('thisIsAtest98!');
const student9 = new Student({
  name: 'Rodrigo',
  surname: 'Rodriguez',
  secondSurname: 'Ramirez',
  email: 'digitalocean@doe.com'
});
student9.setPassword('thisIsAtest98!');
const student10 = new Student({
  name: 'Gerardo',
  surname: 'Prieto',
  secondSurname: 'Cardenas',
  email: 'rodrigo@doe.com'
});
student10.setPassword('thisIsAtest98!');

// Creating teachers
const teacher1 = new Teacher({
  name: 'Arturo',
  surname: 'Jacome',
  secondSurname: 'Portillo',
  email: 'oscarmartinez1998@hotmail.es'
});
teacher1.setPassword('thisIsAtest98!');
const teacher2 = new Teacher({
  name: 'Mohamed',
  surname: 'Jacome',
  secondSurname: 'Portillo',
  email: 'arturomjacomep@gmail.com'
});
teacher2.setPassword('thisIsAtest98!');

// Creating groups
const group1 = new Group({
  name: '1°A Turno Vespertino Matematicas',
  teacherId: teacher1
});
const group2 = new Group({
  name: '1°B Turno Vespertino Matematicas',
  teacherId: teacher1
});
const group3 = new Group({
  name: '1°C Turno Vespertino Matematicas',
  teacherId: teacher1
});
const group4 = new Group({
  name: '1°A Turno Matutino Matematicas',
  teacherId: teacher1
});
const group5 = new Group({
  name: '1°A Turno Matutino Fisica',
  teacherId: teacher1
});

// Creating enrollments
const enroll1 = new Enrollment({
  student: student1,
  group: group1
});
enroll1.status = true;
const enroll2 = new Enrollment({
  student: student2,
  group: group1
});
enroll2.status = true;
const enroll3 = new Enrollment({
  student: student3,
  group: group1
});
enroll3.status = true;
const enroll4 = new Enrollment({
  student: student4,
  group: group1
});
enroll4.status = false;
const enroll5 = new Enrollment({
  student: student5,
  group: group1
});
enroll5.status = false;

const enroll6 = new Enrollment({
  student: student6,
  group: group2
});
enroll6.status = true;
const enroll7 = new Enrollment({
  student: student7,
  group: group2
});
enroll7.status = true;
const enroll8 = new Enrollment({
  student: student8,
  group: group2
});
enroll8.status = false;
const enroll9 = new Enrollment({
  student: student9,
  group: group2
});
enroll9.status = false;
const enroll10 = new Enrollment({
  student: student10,
  group: group2
});
enroll10.status = false;

const enroll11 = new Enrollment({
  student: student1,
  group: group5
});
enroll11.status = true;
const enroll12 = new Enrollment({
  student: student1,
  group: group2
});
enroll12.status = true;
const enroll13 = new Enrollment({
  student: student1,
  group: group3
});
enroll13.status = true;

//Aquí empezara a revisar las preguntas
const question1 = new Question({
  statement: 'Ordena de mayor a menor los siguientes numeros: $1, $2, $3, $4',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Numeros',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: [23, 12, 45, 89],
      answer: [12, 23, 45, 89],
      complexity: 1,
      paths: [
        {answer: [12,23,45,89], accuracy: 1},
        {answer: [23,12,45,89], accuracy: 0.8},
        {answer: [12,45,23,89], accuracy: 0.6},
        {answer: [89,12,23,45], accuracy: 0.3},
      ]
    },
    {
      variables: [98, 12, 14, 90],
      answer: [12, 14, 90, 98],  //cambié el número
      complexity: 1,
      paths:[
        {answer: [12,14,90,98], accuracy: 1},
        {answer: [14,90,12,98], accuracy: 0.4},
        {answer: [12,14,98,90], accuracy: 0.6},
        {answer: [98,90,14,12], accuracy: 0.6},
      ]
    },
    {
      variables: [17, 86, 34, 65],
      answer: [17, 34, 65, 86],
      complexity: 1,
      paths:[
        {answer: [17,34,65,86], accuracy: 1},
        {answer: [86,65,34,17], accuracy: 0.2},
        {answer: [34,17,65,86], accuracy: 0.4},
        {answer: [17,34,86,65], accuracy: 0.7},
      ]
    },
    {
      variables: [56, 76, 94, 18],
      answer: [18, 56, 76, 94],
      complexity: 1,
      paths:[
        {answer: [18,56,76,94], accuracy: 1},
        {answer: [18,56,94,76], accuracy: 0.8},
        {answer: [94,76,56,18], accuracy: 0.3},
        {answer: [56,18,76,94], accuracy: 0.4},
      ]
    },
    {
      variables: [23, 12, 45, 89],
      answer: [12, 23, 45, 89],
      complexity: 1,
      paths:[
        {answer: [12,23,45,89], accuracy: 1},
        {answer: [12,45,23,89], accuracy: 0.6},
        {answer: [12,23,89,45], accuracy: 0.4},
        {answer: [89,45,23,12], accuracy: 0.1},
      ]
    }
  ]
});
const question2 = new Question({
  statement: 'Convierte la siguiente fracción a notación decimal $1, $2',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Numeros',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: [1, 2],
      answer: [0.5],
      complexity: 1,
      paths: [
        { answer: [0.3], accuracy: 0.4},
        { answer: [0.5], accuracy: 1},
        { answer: [1], accuracy: 0.1},
        { answer: [0.6], accuracy: 0.8},
      ]
    },
    {
      variables: [14, 20],
      answer: [0.7],
      complexity: 1,
      paths:[
        {answer:[0.6], accuracy:0.6},
        {answer:[0.7], accuracy:1},
        {answer:[0.3], accuracy:0.3},
        {answer:[1], accuracy:0.1},
      ]
    },
    {
      variables: [6, 16],
      answer: [0.375],
      complexity: 1,
      paths:[
        {answer:[0.3], accuracy:0.9},
        {answer:[0.4], accuracy:0.7},
        {answer:[0.375], accuracy:1},
        {answer:[0.1], accuracy:0.5},
      ]
    },
    {
      variables: [14, 8],
      answer: [1.75],
      complexity: 1,
      paths:[
        {answer:[2], accuracy:0.7},
        {answer:[1.75], accuracy:1},
        {answer:[1.8], accuracy:0.9},
        {answer:[1], accuracy:0.3},
      ]
    },
    {
      variables: [1, 2],
      answer: [0.5],
      complexity: 1,
      paths:[
        {answer:[0.6], accuracy:0.9},
        {answer:[0.5], accuracy:1},
        {answer:[0.3], accuracy:0.7},
        {answer:[1], accuracy:0.2},
      ]
    }
  ]
});
const question3 = new Question({
  statement: 'Convierte el siguiente número decimal a fraccion $1',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Numeros',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: [0.5],
      answer: [1, 2],
      complexity: 1,
      paths:[
        {answer:[2,3], accuracy:0.4},
        {answer:[1,2], accuracy:1},
        {answer:[2,6], accuracy:0.3},
        {answer:[4,5], accuracy:0.2},
      ]
    },
    {
      variables: [2.75],
      answer: [11, 4],
      complexity: 1,
      paths:[
        {answer:[11,3], accuracy:0.8},
        {answer:[10,4], accuracy:0.3},
        {answer:[11,4], accuracy:1},
        {answer:[8,5], accuracy:0.1},
      ]
    },
    {
      variables: [3.12],
      answer: [78, 25],
      complexity: 1,
      paths:[
        {answer:[78,27], accuracy:0.3},
        {answer:[78,25], accuracy:1},
        {answer:[77,24], accuracy:0.4},
        {answer:[80,23], accuracy:0.1},
      ]
    },
    {
      variables: [0.36],
      answer: [9, 25],
      complexity: 1,
      paths:[
        {answer:[8,25], accuracy:0.8},
        {answer:[9,25], accuracy:1},
        {answer:[9,24], accuracy:0.6},
        {answer:[8,27], accuracy:0.4},
      ]
    },
    {
      variables: [0.9],
      answer: [9, 10],
      complexity: 1,
      paths:[
        {answer:[7,10], accuracy:0.7},
        {answer:[9,10], accuracy:1},
        {answer:[11,10], accuracy:0.8},
        {answer:[1,10], accuracy:0.3},
      ]
    },
  ]
});
const question4 = new Question({
  statement: 'Realiza la siguiente operación y expresa el resultado en decimal $1, $2, $3',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Números, adición y sustracción',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: [56, '+', 72],
      answer: [128],
      complexity: 1,
      paths:[
        {answer:[130], accuracy:0.5},
        {answer:[128], accuracy:1},
        {answer:[126], accuracy:0.3},
        {answer:[125], accuracy:0.1},
      ]
    },
    {
      variables: [56, '-', 32],
      answer: [24],
      complexity: 1,
      paths:[
        {answer:[28], accuracy:0.2},
        {answer:[26], accuracy:0.5},
        {answer:[24], accuracy:1},
        {answer:[20], accuracy:0.1},
      ]
    },
    {
      variables: [67, '+', 1],
      answer: [68],  // number
      complexity: 1,
      paths:[
        {answer:[68], accuracy:1},
        {answer:[58], accuracy:0.1},
        {answer:[69], accuracy:0.3},
        {answer:[67], accuracy:0.5},
      ]
    },
    {
      variables: [77, '+', 33],
      answer: [110],
      complexity: 1,
      paths:[
        {answer:[110], accuracy:1},
        {answer:[108], accuracy:0.5},
        {answer:[100], accuracy:0.1},
        {answer:[111], accuracy:0.2},
      ]
    },
    {
      variables: [12, '+', 23],
      answer: [35],
      complexity: 1,
      paths:[
        {answer:[35], accuracy:1},
        {answer:[30], accuracy:0.3},
        {answer:[38], accuracy:0.4},
        {answer:[40], accuracy:0.1},
      ]
    },
  ]
});
const question5 = new Question({
  statement: 'Realiza la siguiente operación y expresa el resultado en fracción $1, $2, $3',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Números, adición y sustracción',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: [3, '/', 6],
      answer: [1, 2],
      complexity: 1,
      paths:[
        {answer:[6,3], accuracy:0.1},
        {answer:[1,2], accuracy:1},
        {answer:[3,2], accuracy:0.3},
        {answer:[3,4], accuracy:0.4},
      ]
    },
    {
      variables: [12, 'x', 6],
      answer: [72],
      complexity: 1,
      paths:[
        {answer:[66], accuracy:0.3},
        {answer:[72], accuracy:1},
        {answer:[70], accuracy:0.4},
        {answer:[80], accuracy:0.1},
      ]
    },
    {
      variables: [12, '/', 36],
      answer: [1, 3],
      complexity: 1,
      paths:[
        {answer:[2,3], accuracy:0.3},
        {answer:[1,3], accuracy:1},
        {answer:[4,3], accuracy:0.2},
        {answer:[1,2], accuracy:0.4},
      ]
    },
    {
      variables: [6, '/', 18],
      answer: [1, 3],
      complexity: 1,
      paths:[
        {answer:[2,3], accuracy:0.7},
        {answer:[1,3], accuracy:1},
        {answer:[2,5], accuracy:0.3},
        {answer:[1,5], accuracy:0.1},
      ]
    },
    {
      variables: [7, '*', 7],
      answer: [49],
      complexity: 1,
      paths:[
        {answer:[45], accuracy:0.4},
        {answer:[49], accuracy:1},
        {answer:[48], accuracy:0.7},
        {answer:[50], accuracy:0.1},
      ]
    },
  ]
});
const question6 = new Question({
  statement: 'Si un trabajador tarda $1 minutos en fabricar $2 ladrillos, cuánto tardará en fabricar $3 ladrillos',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Proporcionalidad, numeración, adición y sustracción.',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: [12, 12, 35],
      answer: [35],
      complexity: 1,
      paths:[
        {answer:[35], accuracy:1},
        {answer:[30], accuracy:0.4},
        {answer:[40], accuracy:0.3},
        {answer:[60], accuracy:0.1},
      ]
    },
    {
      variables: [15, 12, 35],
      answer: [43.75],
      complexity: 1,
      paths:[
        {answer:[43], accuracy:0.8},
        {answer:[43.75], accuracy:1},
        {answer:[40], accuracy:0.4},
        {answer:[45], accuracy:0.2},
      ]
    },
    {
      variables: [20, 5, 15],
      answer: [60],
      complexity: 1,
      paths:[
        {answer:[60], accuracy:1},
        {answer:[63], accuracy:0.2},
        {answer:[58], accuracy:0.6},
        {answer:[50], accuracy:0.1},
      ]
    },
    {
      variables: [2, 9, 30],
      answer: [6.66],
      complexity: 1,
      paths:[
        {answer:[6.5], accuracy:0.8},
        {answer:[6.66], accuracy:1},
        {answer:[5], accuracy:0.5},
        {answer:[7], accuracy:0.2},
      ]
    },
    {
      variables: [8, 16, 25],
      answer: [12.5],
      complexity: 1,
      paths:[
        {answer:[12], accuracy:0.8},
        {answer:[12.5], accuracy:1},
        {answer:[13], accuracy:0.5},
        {answer:[10], accuracy:0.1},
      ]
    },
  ]
});
const question7 = new Question({
  statement: 'Si $1 kilos de manzanas valen $1 cuánto valdrán $3 kilos de manzanas?',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Proporcionalidad, numeración, adición y sustracción.',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: [1, 1, 2],
      answer: [2],
      complexity: 1,
      paths:[
        {answer:[1], accuracy:0.2},
        {answer:[2], accuracy:1},
        {answer:[3], accuracy:0.3},
        {answer:[1.5], accuracy:0.6},
      ]
    },
    {
      variables: [1, 3.75, 2],
      answer: [7.5],
      complexity: 1,
      paths:[
        {answer:[8], accuracy:0.7},
        {answer:[7.5], accuracy:1},
        {answer:[6.28], accuracy:0.3},
        {answer:[7], accuracy:0.4},
      ]
    },
    {
      variables: [2, 0.5, 3.75],
      answer: [0.937],  //number
      complexity: 1,
      paths:[
        {answer:[1], accuracy:0.9},
        {answer:[0.937], accuracy:1},
        {answer:[0.5], accuracy:0.5},
        {answer:[0.8], accuracy:0.6},
      ]
    },
    {
      variables: [1.5, 1.2, 2.8],
      answer: [2.24],  //number
      complexity: 1,
      paths:[
        {answer:[2.24], accuracy:1},
        {answer:[2], accuracy:0.7},
        {answer:[3], accuracy:0.3},
        {answer:[2.1], accuracy:0.8},
      ]
    },
    {
      variables: [2, 30, 0.75],
      answer: [11.25],
      complexity: 1,
      paths:[
        {answer:[11.25], accuracy:1},
        {answer:[10], accuracy:0.4},
        {answer:[11], accuracy:0.8},
        {answer:[12], accuracy:0.6},
      ]
    },
  ]
});
const question8 = new Question({
  statement: 'Resolver la siguiente ecuacion lineal x $1 $2 = $3',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Proporcionalidad, numeración, adición y sustracción.',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: ['+', 7, 8],
      answer: [1],
      complexity: 1,
      paths:[
        {answer:[-1], accuracy:0.3},
        {answer:[1], accuracy:1},
        {answer:[0], accuracy:0.5},
        {answer:[2], accuracy:0.1},
      ]
    },
    {
      variables: ['-', 4, 4],
      answer: [8],
      complexity: 1,
      paths:[
        {answer:[8], accuracy:1},
        {answer:[0], accuracy:0.3},
        {answer:[4], accuracy:0.5},
        {answer:[-8], accuracy:0.1},
      ]
    },
    {
      variables: ['+', 3, 10],
      answer: [7],
      complexity: 1,
      paths:[
        {answer:[7], accuracy:1},
        {answer:[13], accuracy:0.1},
        {answer:[10], accuracy:0.4},
        {answer:[-7], accuracy:0.2},
      ]
    },
    {
      variables: ['-', 5, -6],
      answer: [-1],
      complexity: 2,
      paths:[
        {answer:[-1], accuracy:1},
        {answer:[-11], accuracy:0.6},
        {answer:[11], accuracy:0.3},
        {answer:[1], accuracy:0.8},
      ]
    },
    {
      variables: ['+', 2, 2],
      answer: [0],
      complexity: 1,
      paths:[
        {answer:[0], accuracy:1},
        {answer:[4], accuracy:0.7},
        {answer:[-4], accuracy:0.1},
        {answer:[1], accuracy:0.3},
      ]
    }

  ]
});
const question9 = new Question({
  statement: 'Encuentra los valores de Y($1, $2, $3) para los siguiente valores f(x) = $4',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Proporcionalidad, numeración, adición y sustracción.',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: [1, 3, 5, 'x + 1'],
      answer: [2, 4, 6],
      complexity: 1,
      paths:[
        {answer:[1,3,5], accuracy:0.7},
        {answer:[2,4,6], accuracy:1},
        {answer:[3,5,1], accuracy:0.3},
        {answer:[5,1,3], accuracy:0.1},
      ]
    },
    {
      variables: [2, 4, 6, 'x'],
      answer: [2, 4, 6],
      complexity: 1,
      paths:[
        {answer:[2,4,6], accuracy:1},
        {answer:[4,6,2], accuracy:0.8},
        {answer:[6,2,4], accuracy:0.5},
        {answer:[4,6,2], accuracy:0.3},
      ]
    },
    {
      variables: [-1, 0, 1, '2*x'],
      answer: [-2, 0, 2],
      complexity: 2,
      paths:[
        {answer:[-2,0,2], accuracy:1},
        {answer:[0,2,-2], accuracy:0.6},
        {answer:[2,-2,0], accuracy:0.4},
        {answer:[0,-2,2], accuracy:0.1},
      ]
    },
    {
      variables: [-2, 0, 2, '0.5*x'],
      answer: [-1, 0, 1],
      complexity: 2,
      paths:[
        {answer:[-1,0,1], accuracy:1},
        {answer:[0,1,-1], accuracy:0.8},
        {answer:[1,0,-1], accuracy:0.5},
        {answer:[0,-1,1], accuracy:0.3},
      ]
    },
    {
      variables: [10, 100, 1000, 'x-1'],
      answer: [9, 99, 999],
      complexity: 1,
      paths:[
        {answer:[9,99,999], accuracy:1},
        {answer:[99,999,9], accuracy:0.9},
        {answer:[999,9,99], accuracy:0.7},
        {answer:[999,99,9], accuracy:0.2},
      ]
    }
  ]
});
const question10 = new Question({
  statement: 'Obtén la media aritmética del siguiente conjunto de datos: $1, $2, $3, $4, $5',
  general_topic: 'Estadistica',
  topic: 'Analisis de datos',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: [1, 34, 82, 23, 30],
      answer: [34],
      complexity: 1,
      paths:[
        {answer:[34], accuracy:1},
        {answer:[23], accuracy:0.6},
        {answer:[1], accuracy:0.1},
        {answer:[30], accuracy:0.8},
      ]
    },
    {
      variables: [6, 5, 8, 3, 9],
      answer: [6],
      complexity: 1,
      paths:[
        {answer:[6], accuracy:1},
        {answer:[5], accuracy:0.8},
        {answer:[3], accuracy:0.6},
        {answer:[9], accuracy:0.3},
      ]
    },
    {
      variables: [10, 11, 12, 13, 14],
      answer: [12],
      complexity: 1,
      paths:[
        {answer:[12], accuracy:1},
        {answer:[11], accuracy:0.9},
        {answer:[13], accuracy:0.5},
        {answer:[10], accuracy:0.7},
      ]
    },
    {
      variables: [1, 2, 3, 4, 5],
      answer: [3],
      complexity: 1,
      paths:[
        {answer:[3], accuracy:1},
        {answer:[2], accuracy:0.9},
        {answer:[4], accuracy:0.7},
        {answer:[5], accuracy:0.5},
      ]
    },
    {
      variables: [2, 4, 6, 8, 10],
      answer: [6],
      complexity: 1,
      paths:[
        {answer:[6], accuracy:1},
        {answer:[4], accuracy:0.7},
        {answer:[8], accuracy:0.4},
        {answer:[2], accuracy:0.2},
      ]
    }
  ]
});

// Area de figuras geometricas
const question11 = new Question({
  statement: 'Calcula el area del siguiente cuadrado en donde cada lado es igual a $1 cm',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'area-cuadrado-x2.png',
  complexity: 1,
  options: [
    {
      variables: [1],
      answer: [1],
      complexity: 1,
      paths:[
        {answer:[1], accuracy:1},
        {answer:[2], accuracy:0.7},
        {answer:[3], accuracy:0.4},
        {answer:[4], accuracy:0.2},
      ]
    },
    {
      variables: [7],
      answer: [49],
      complexity: 3,
      paths:[
        {answer:[7], accuracy:0.1},
        {answer:[14], accuracy:0.4},
        {answer:[49], accuracy:1},
        {answer:[28], accuracy:0.7},
      ]
    },
    {
      variables: [2.5],
      answer: [6.25],
      complexity: 4,
      paths:[
        {answer:[6.25], accuracy:1},
        {answer:[12], accuracy:0.5},
        {answer:[36], accuracy:0.3},
        {answer:[40], accuracy:0.1},
      ]
    },
    {
      variables: [5],
      answer: [25],
      complexity: 4,
      paths:[
        {answer:[25], accuracy:1},
        {answer:[20], accuracy:0.7},
        {answer:[30], accuracy:0.5},
        {answer:[15], accuracy:0.6},
      ]
    },
    {
      variables: [3.5],
      answer: [12.25],
      complexity: 4,
      paths:[
        {answer:[12.25], accuracy:1},
        {answer:[14], accuracy:0.7},
        {answer:[7], accuracy:0.5},
        {answer:[10], accuracy:0.8},
      ]
    }
  ]
});
const question12 = new Question({
  statement: 'Calcula el area del siguiente rectangulo en donde la base es igual a $1 y la altura igual a $2 m',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'area-rectangulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [1, 2],
      answer: [2],
      complexity: 1,
      paths:[
        {answer:[2], accuracy:1},
        {answer:[1], accuracy:0.9},
        {answer:[4], accuracy:0.7},
        {answer:[8], accuracy:0.4},
      ]
    },
    {
      variables: [5, 10],
      answer: [50],
      complexity: 1,
      paths:[
        {answer:[50], accuracy:1},
        {answer:[25], accuracy:0.8},
        {answer:[10], accuracy:0.5},
        {answer:[20], accuracy:0.2},
      ]
    },
    {
      variables: [3.3, 2.5],
      answer: [8.25],
      complexity: 4,
      paths:[
        {answer:[8.25], accuracy:1},
        {answer:[9.9], accuracy:0.8},
        {answer:[6.6], accuracy:0.5},
        {answer:[5], accuracy:0.7},
      ]
    },
    {
      variables: [53, 8.1],
      answer: [429.3],
      complexity: 4,
      paths:[
        {answer:[429.3], accuracy:1},
        {answer:[106], accuracy:0.7},
        {answer:[16], accuracy:0.1},
        {answer:[60], accuracy:0.5},
      ]
    },
    {
      variables: [5, 8.5],
      answer: [42.5],
      complexity: 3,
      paths:[
        {answer:[42.5], accuracy:1},
        {answer:[25], accuracy:0.8},
        {answer:[17], accuracy:0.1},
        {answer:[20], accuracy:0.6},
      ]
    }
  ]
});
const question13 = new Question({
  statement: 'Calcula el area del siguiente rombo en donde la diagonal D es igual a $1 y la diagonal d es igual a $2 cm',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'area-rombo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [5, 15],
      answer: [37.5],
      complexity: 3,
      paths:[
        {answer:[37.5], accuracy:1},
        {answer:[10], accuracy:0.2},
        {answer:[30], accuracy:0.7},
        {answer:[25], accuracy:0.5},
      ]
    },
    {
      variables: [10, 25],
      answer: [125],
      complexity: 2,
      paths:[
        {answer:[20], accuracy:0.1},
        {answer:[50], accuracy:0.5},
        {answer:[35], accuracy:0.3},
        {answer:[125], accuracy:1},
      ]
    },
    {
      variables: [2.5, 5],
      answer: [6.25],
      complexity: 3,
      paths:[
        {answer:[5], accuracy:0.8},
        {answer:[10], accuracy:0.1},
        {answer:[6.25], accuracy:1},
        {answer:[7.5], accuracy:0.6},
      ]
    },
    {
      variables: [15, 25],
      answer: [187.5],
      complexity: 2,
      paths:[
        {answer:[30], accuracy:0.2},
        {answer:[187.5], accuracy:1},
        {answer:[50], accuracy:0.6},
        {answer:[40], accuracy:0.5},
      ]
    },
    {
      variables: [1.2, 3.5],
      answer: [2.1],
      complexity: 3,
      paths:[
        {answer:[2.4], accuracy:0.7},
        {answer:[2.1], accuracy:1},
        {answer:[7], accuracy:0.5},
        {answer:[4.7], accuracy:0.3},
      ]
    }
  ]
});
const question14 = new Question({
  statement: 'Calcula el area del siguiente triangulo, donde la base b es igual a $1 y la altura h es igual a $2 m',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'area-circulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [1, 2],
      answer: [1],
      complexity: 1,
      paths:[
        {answer:[1], accuracy:1},
        {answer:[2], accuracy:0.8},
        {answer:[3], accuracy:0.5},
        {answer:[4], accuracy:0.3},
      ]
    },
    {
      variables: [3, 10],
      answer: [15],
      complexity: 1,
      paths:[
        {answer:[15], accuracy:1},
        {answer:[6], accuracy:0.4},
        {answer:[10], accuracy:0.7},
        {answer:[13], accuracy:0.8},
      ]
    },
    {
      variables: [4.5, 8.5],
      answer: [19.12],
      complexity: 3,
      paths:[
        {answer:[19.12], accuracy:1},
        {answer:[9], accuracy:0.7},
        {answer:[17], accuracy:0.2},
        {answer:[13], accuracy:0.4},
      ]
    },
    {
      variables: [42.2, 53.7],
      answer: [1133.07],
      complexity: 4,
      paths:[
        {answer:[84.4], accuracy:0.8},
        {answer:[1133.07], accuracy:1},
        {answer:[57.4], accuracy:0.6},
        {answer:[95], accuracy:0.7},
      ]
    },
    {
      variables: [13, 20],
      answer: [130],
      complexity: 1,
      paths:[
        {answer:[26], accuracy:0.2},
        {answer:[40], accuracy:0.4},
        {answer:[130], accuracy:1},
        {answer:[33], accuracy:0.5},
      ]
    }
  ]
});
const question15 = new Question({
  statement: 'Calcula el area del siguiente circulo, donde el radio es igual a $1 cm donde el valor de pi = 3.1415',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'area-circulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [5],
      answer: [78.53],
      complexity: 1,
      paths:[
        {answer:[78.53], accuracy:1},
        {answer:[20], accuracy:0.3},
        {answer:[25], accuracy:0.5},
        {answer:[31], accuracy:0.8},
      ]
    },
    {
      variables: [2.5],
      answer: [19.63],
      complexity: 3,
      paths:[
        {answer:[19.63], accuracy:1},
        {answer:[5], accuracy:0.2},
        {answer:[10], accuracy:0.6},
        {answer:[2.5], accuracy:0.1},
      ]
    },
    {
      variables: [28],
      answer: [2463],
      complexity: 2,
      paths:[
        {answer:[2463], accuracy:1},
        {answer:[56], accuracy:0.5},
        {answer:[13], accuracy:0.1},
        {answer:[100], accuracy:0.7},
      ]
    },
    {
      variables: [10.3],
      answer: [333.3],
      complexity: 4,
      paths:[
        {answer:[333.3], accuracy:1},
        {answer:[3.3], accuracy:0.1},
        {answer:[33.3], accuracy:0.3},
        {answer:[100], accuracy:0.8},
      ]
    },
    {
      variables: [5.33],
      answer: [89.25],
      complexity: 4,
      paths:[
        {answer:[89.25], accuracy:1},
        {answer:[10.6], accuracy:0.3},
        {answer:[55.33], accuracy:0.6},
        {answer:[10], accuracy:0.1},
      ]
    }
  ]
});

// Perimetro de figuras geometricas
const question16 = new Question({
  statement: 'Calcula el perimetro del siguiente cuadrado donde el lado L es igual a $1 m',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'perimetro-cuadrado-x2.png',
  complexity: 1,
  options: [
    {
      variables: [1],
      answer: [4],
      complexity: 1,
      paths:[
        {answer:[2], accuracy:0.4},
        {answer:[3], accuracy:0.8},
        {answer:[6], accuracy:0.7},
        {answer:[4], accuracy:1},
      ]
    },
    {
      variables: [5],
      answer: [20],
      complexity: 1,
      paths:[
        {answer:[30], accuracy:0.4},
        {answer:[20], accuracy:1},
        {answer:[25], accuracy:0.7},
        {answer:[45], accuracy:0.1},
      ] 
    },
    {
      variables: [3.3],
      answer: [13.2],
      complexity: 2,
      paths:[
        {answer:[13.2], accuracy:1},
        {answer:[10], accuracy:0.8},
        {answer:[6], accuracy:0.5},
        {answer:[9.9], accuracy:6},
      ]
    },
    {
      variables: [5.7],
      answer: [22.8],
      complexity: 2,
      paths:[
        {answer:[22.8], accuracy:1},
        {answer:[20], accuracy:0.8},
        {answer:[10], accuracy:0.5},
        {answer:[30], accuracy:0.3},
      ]
    },
    {
      variables: [13.7],
      answer: [54.8],
      complexity: 3,
      paths:[
        {answer:[54.8], accuracy:1},
        {answer:[50], accuracy:0.8},
        {answer:[60], accuracy:0.4},
        {answer:[20], accuracy:0.21},
      ]
    }

  ]
});
const question17 = new Question({
  statement: 'Calcula el perimetro del siguiente rectangulo donde la base L es igual a $1 m y la altura l es igual a $2 m',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'perimetro-rectangulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [5, 3],
      answer: [16],
      complexity: 1,
      paths:[
        {answer:[20], accuracy:0.8},
        {answer:[16], accuracy:1},
        {answer:[15], accuracy:0.5},
        {answer:[25], accuracy:0.3},
      ]
    },
    {
      variables: [23, 35],
      answer: [116],
      complexity: 2,
      paths:[
        {answer:[200], accuracy:0.4},
        {answer:[120], accuracy:0.7},
        {answer:[116], accuracy:1},
        {answer:[100], accuracy:0.8},
      ]
    },
    {
      variables: [5.7, 9.2],
      answer: [29.8],
      complexity: 3,
      paths:[
        {answer:[29.8], accuracy:1},
        {answer:[30], accuracy:0.8},
        {answer:[26], accuracy:0.5},
        {answer:[14.5], accuracy:0.3},
      ]
    },
    {
      variables: [22.3, 28.9],
      answer: [102.4],
      complexity: 4,
      paths:[
        {answer:[100], accuracy:0.8},
        {answer:[130.8], accuracy:0.4},
        {answer:[102.4], accuracy:1},
        {answer:[110.5], accuracy:0.6},
      ]
    },
    {
      variables: [55.72, 53.24],
      answer: [217.92],
      complexity: 5,
      paths:[
        {answer:[217.92], accuracy:1},
        {answer:[300.84], accuracy:0.1},
        {answer:[200.65], accuracy:0.7},
        {answer:[220.78], accuracy:0.5},
      ]
    }
  ]
});
const question18 = new Question({
  statement: 'Calcula el perimetro del siguiente rombo donde el lado L es igual a $1 cm',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'perimetro-rectangulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [8],
      answer: [32],
      complexity: 1,
      paths:[
        {answer:[22], accuracy:0.7},
        {answer:[32], accuracy:1},
        {answer:[25], accuracy:0.8},
        {answer:[40], accuracy:0.1},
      ]
    },
    {
      variables: [37],
      answer: [148],
      complexity: 2,
      paths:[
        {answer:[150], accuracy:0.9},
        {answer:[130], accuracy:0.5},
        {answer:[148], accuracy:1},
        {answer:[142], accuracy:0.7},
      ]
    },
    {
      variables: [8.7],
      answer: [34.8],
      complexity: 3,
      paths:[
        {answer:[34.8], accuracy:1},
        {answer:[30.5], accuracy:0.8},
        {answer:[38.9], accuracy:0.6},
        {answer:[20.8], accuracy:0.1},
      ]
    },
    {
      variables: [73.7],
      answer: [294.8],
      complexity: 4,
      paths:[
        {answer:[260.5], accuracy:0.7},
        {answer:[300.4], accuracy:0.8},
        {answer:[250.7], accuracy:0.4},
        {answer:[294.8], accuracy:1},
      ]
    },
    {
      variables: [83.24],
      answer: [332.96],
      complexity: 5,
      paths:[
        {answer:[350.35], accuracy:0.4},
        {answer:[329.84], accuracy:0.6},
        {answer:[300.48], accuracy:0.8},
        {answer:[332.96], accuracy:1},
      ]
    }
  ]
});
const question19 = new Question({
  statement: 'Calcula el perimetro del siguiente tirangulo donde el lado L es igual a $1 m',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'perimetro-rectangulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [5],
      answer: [15],
      complexity: 1,
      paths:[
        {answer:[20], accuracy:0.5},
        {answer:[25], accuracy:0.3},
        {answer:[15], accuracy:1},
        {answer:[10], accuracy:0.6},
      ]
    },
    {
      variables: [37],
      answer: [111],
      complexity: 2,
      paths:[
        {answer:[111], accuracy:1},
        {answer:[100], accuracy:0.7},
        {answer:[122], accuracy:0.4},
        {answer:[130], accuracy:0.1},
      ]
    },
    {
      variables: [5.7],
      answer: [17.1],
      complexity: 3,
      paths:[
        {answer:[20.3], accuracy:0.5},
        {answer:[18.5], accuracy:0.7},
        {answer:[15.8], accuracy:0.8},
        {answer:[17.1], accuracy:1},
      ]
    },
    {
      variables: [67.3],
      answer: [201.9],
      complexity: 4,
      paths:[
        {answer:[160.3], accuracy:0.4},
        {answer:[198.8], accuracy:0.8},
        {answer:[201.9], accuracy:1},
        {answer:[153.4], accuracy:0.1},
      ]
    },
    {
      variables: [26.37],
      answer: [79.11],
      complexity: 5,
      paths:[
        {answer:[50.21], accuracy:0.4},
        {answer:[75.43], accuracy:0.8},
        {answer:[60.05], accuracy:0.7},
        {answer:[79.11], accuracy:1},
      ]
    }
  ]
});
const question20 = new Question({
  statement: 'Calcula el perimetro del siguiente circulo donde el radio r es igual a $1 cm, tomando a pi = 3.1415',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'perimetro-circulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [2],
      answer: [12.57],
      complexity: 1,
      paths:[
        {answer:[10.45], accuracy:0.7},
        {answer:[11.98], accuracy:0.8},
        {answer:[12.11], accuracy:0.9},
        {answer:[12.57], accuracy:1},
      ]
    },
    {
      variables: [37],
      answer: [232.47],
      complexity: 2,
      paths:[
        {answer:[200.08], accuracy:0.4},
        {answer:[229.48], accuracy:0.8},
        {answer:[225.47], accuracy:0.7},
        {answer:[232.47], accuracy:1},
      ]
    },
    {
      variables: [7.3],
      answer: [45.86],
      complexity: 3,
      paths:[
        {answer:[45.86], accuracy:1},
        {answer:[40.86], accuracy:0.8},
        {answer:[50.27], accuracy:0.4},
        {answer:[45], accuracy:0.9},
      ]
    },
    {
      variables: [76.6],
      answer: [481.3],
      complexity: 4,
      paths:[
        {answer:[410.6], accuracy:0.1},
        {answer:[438.4], accuracy:0.4},
        {answer:[468.6], accuracy:0.7},
        {answer:[481.3], accuracy:1},
      ]
    },
    {
      variables: [37.73],
      answer: [237.06],
      complexity: 4,
      paths:[
        {answer:[237.06], accuracy:1},
        {answer:[233.54], accuracy:0.8},
        {answer:[260.45], accuracy:0.3},
        {answer:[245.26], accuracy:0.5},
      ]
    }
  ]
});

// Volumen de figuras geometricas
const question21 = new Question({
  statement: 'Calcula el volumen del siguiente cilindro donde la altura h es igual a $1 cm y el radio r es igual a $2 cm, tomando pi = 3.1415',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'cilindro-png@2x.png',
  complexity: 1,
  options: [
    {
      variables: [5, 8],
      answer: [1005.31],
      complexity: 1,
      paths:[
        {answer:[1005.31], accuracy:1},
        {answer:[1000.84], accuracy:0.7},
        {answer:[1008.45], accuracy:0.4},
        {answer:[998.15], accuracy:0.2},
      ]
    },
    {
      variables: [13, 17],
      answer: [11803],
      complexity: 2,
      paths:[
        {answer:[11803], accuracy:1},
        {answer:[11800], accuracy:0.8},
        {answer:[11793], accuracy:0.5},
        {answer:[11820], accuracy:0.1},
      ]
    },
    {
      variables: [3.5, 5.6],
      answer: [344.82],
      complexity: 3,
      paths:[
        {answer:[340.82], accuracy:0.8},
        {answer:[344.82], accuracy:1},
        {answer:[384.82], accuracy:0.6},
        {answer:[310], accuracy:0.1},
      ]
    },
    {
      variables: [12.2, 14.3],
      answer: [7837.57],
      complexity: 4,
      paths:[
        {answer:[7837.50], accuracy:0.8},
        {answer:[7837.71], accuracy:0.5},
        {answer:[7837.57], accuracy:1},
        {answer:[7837.11], accuracy:0.1},
      ]
    },
    {
      variables: [14.21, 11.37],
      answer: [5771.18],
      complexity: 5,
      paths:[
        {answer:[5771], accuracy:0.7},
        {answer:[5771.18], accuracy:1},
        {answer:[5771.89], accuracy:0.4},
        {answer:[5772], accuracy:0.2},
      ]
    }

  ]
});
const question22 = new Question({
  statement: 'Calcula el volumen del siguiente prisma cuadrangular donde el lado de la base es igual a $1 cm, y la altura y es igual a $2 cm',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'cubo-png@2x.png',
  complexity: 1,
  options: [
    {
      variables: [5, 2],
      answer: [50],
      complexity: 1,
      paths:[
        {answer:[10], accuracy:0.3},
        {answer:[50], accuracy:1},
        {answer:[46], accuracy:0.8},
        {answer:[37], accuracy:0.5},
      ]
    },
    {
      variables: [21, 12],
      answer: [5292],
      complexity: 2,
      paths:[
        {answer:[5200], accuracy:0.3},
        {answer:[5290], accuracy:0.9},
        {answer:[5300], accuracy:0.7},
        {answer:[5292], accuracy:1},
      ]
    },
    {
      variables: [7.3, 5.7],
      answer: [303.75],
      complexity: 3,
      paths:[
        {answer:[303.75], accuracy:1},
        {answer:[300], accuracy:0.7},
        {answer:[310], accuracy:0.4},
        {answer:[305.8], accuracy:0.9},
      ]
    },
    {
      variables: [11.2, 15.3],
      answer: [1919.23],
      complexity: 4,
      paths:[
        {answer:[1920], accuracy:0.8},
        {answer:[1919.23], accuracy:1},
        {answer:[1918.4], accuracy:0.9},
        {answer:[1910.7], accuracy:0.3},
      ]
    },
    {
      variables: [12.11, 17.13],
      answer: [2512.15],
      complexity: 5,
      paths:[
        {answer:[2519.78], accuracy:0.1},
        {answer:[2515], accuracy:0.7},
        {answer:[2510.8], accuracy:0.8},
        {answer:[2512.15], accuracy:1},
      ]
    },
  ]
});
const question23 = new Question({
  statement: 'Calcula el volumen de la siguiente esfera donde el radio r es igual a $1 cm, tomando pi = 3.1415',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'esfera-png@2x.png',
  complexity: 1,
  options: [
    {
      variables: [4],
      answer: [268.08],
      complexity: 1,
      paths:[
        {answer:[250.8], accuracy:0.4},
        {answer:[257.9], accuracy:0.7},
        {answer:[268.08], accuracy:1},
        {answer:[273.5], accuracy:0.6},
      ]
    },
    {
      variables: [12],
      answer: [7238.22],
      complexity: 2,
      paths:[
        {answer:[7238.22], accuracy:1},
        {answer:[7238.68], accuracy:0.6},
        {answer:[7238.01], accuracy:0.8},
        {answer:[7238.15], accuracy:0.9},
      ]
    },
    {
      variables: [14.4],
      answer: [12507.66],
      complexity: 3,
      paths:[
        {answer:[12507.66], accuracy:1},
        {answer:[12500.66], accuracy:0.7},
        {answer:[12490.66], accuracy:0.4},
        {answer:[12505.66], accuracy:0.9},
      ]
    },
    {
      variables: [4.17],
      answer: [303.73],
      complexity: 4,
      paths:[
        {answer:[303.75], accuracy:0.8},
        {answer:[303.73], accuracy:1},
        {answer:[303.54], accuracy:0.4},
        {answer:[303.70], accuracy:0.9},
      ]
    },
    {
      variables: [12.17],
      answer: [7550.23],
      complexity: 5,
      paths:[
        {answer:[303.75], accuracy:1},
        {answer:[300], accuracy:0.7},
        {answer:[310], accuracy:0.4},
        {answer:[305.8], accuracy:0.9},
      ]
    }
  ]
});
const question24 = new Question({
  statement: 'Calcula el volumen de la siguiente priamide rectangular donde el área de la base b es igual a $1 cm y la altura h es igual a $2 cm',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'piramide-png@2x.png',
  complexity: 1,
  options: [
    {
      variables: [4, 5],
      answer: [20],
      complexity: 1,
      paths:[
        {answer:[20], accuracy:1},
        {answer:[10], accuracy:0.6},
        {answer:[15], accuracy:0.8},
        {answer:[25], accuracy:0.4},
      ]
    },
    {
      variables: [12, 15],
      answer: [180],
      complexity: 2,
      paths:[
        {answer:[30], accuracy:0.3},
        {answer:[24], accuracy:0.1},
        {answer:[150], accuracy:0.8},
        {answer:[180], accuracy:1},
      ]
    },
    {
      variables: [7.3, 5.4],
      answer: [39.42],
      complexity: 3,
      paths:[
        {answer:[39.42], accuracy:1},
        {answer:[37.87], accuracy:0.7},
        {answer:[30.43], accuracy:0.4},
        {answer:[39.11], accuracy:0.9},
      ]
    },
    {
      variables: [13.4, 15.7],
      answer: [210.38],
      complexity: 4,
      paths:[
        {answer:[210.38], accuracy:1},
        {answer:[215.48], accuracy:0.5},
        {answer:[190.87], accuracy:0.4},
        {answer:[209.74], accuracy:0.9},
      ]
    },
    {
      variables: [14.12, 15.35],
      answer: [216.74],
      complexity: 5,
      paths:[
        {answer:[216.74], accuracy:1},
        {answer:[230.47], accuracy:0.3},
        {answer:[200.37], accuracy:0.4},
        {answer:[215.65], accuracy:0.9},
      ]
    }
  ]
});

// Teorema de Pitagoras
// Aplicar ternas pitagoricas
const question25 = new Question({
  statement: 'Calcula la longitud del cateto a tomando en cuenta que el cateto b es igual a $1 y la hipotenusa c es igual a $2',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'teorema-pitagoras-x2.png',
  complexity: 1,
  options: [
    {
      variables: [4, 8],
      answer: [6.93],
      complexity: 1,
      paths:[
        {answer:[6], accuracy:0.8},
        {answer:[7], accuracy:0.4},
        {answer:[6.93], accuracy:1},
        {answer:[6.58], accuracy:0.9},
      ]
    },
    {
      variables: [10, 11],
      answer: [4.6],
      complexity: 1,
      paths:[
        {answer:[4.6], accuracy:1},
        {answer:[4.3], accuracy:0.7},
        {answer:[3.9], accuracy:0.4},
        {answer:[4.5], accuracy:0.9},
      ]
    },
    {
      variables: [25, 26],
      answer: [7.14],
      complexity: 1,
      paths:[
        {answer:[7], accuracy:0.9},
        {answer:[7.14], accuracy:1},
        {answer:[7.5], accuracy:0.4},
        {answer:[7.1], accuracy:0.9},
      ]
    },
    {
      variables: [5, 30], 
      answer: [29.6], 
      complexity: 1,
      paths:[
        {answer:[30], accuracy:0.8},
        {answer:[28], accuracy:0.7},
        {answer:[25], accuracy:0.4},
        {answer:[29.6], accuracy:1},
      ]
    },
    {
      variables: [1, 2],
      answer: [1.73],
      complexity: 1,
      paths:[
        {answer:[2], accuracy:0.7},
        {answer:[1.73], accuracy:1},
        {answer:[1.6], accuracy:0.9},
        {answer:[1], accuracy:0.1},
      ]
    }
  ]
});
const question26 = new Question({
  statement: 'Calcula la longitud de la hipotenusa c tomando en cuenta que el cateto a es igual a $1 y el cateto b es igual a $2',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'teorema-pitagoras-x2.png',
  complexity: 1,
  options: [
    {
      variables: [3, 4],
      answer: [5],
      complexity: 1,
      paths:[
        { answer:[ 5 ], accuracy: 1 },
        {answer:[ 4 ], accuracy: 0.5 },
        {answer:[ 10 ], accuracy: 0.2 },
        {answer:[ 7 ], accuracy: 0.1 },
      ]
    },
    {
      variables: [8, 10],
      answer: [12.8],
      complexity: 1,
      paths:[
        { answer:[ 12.8 ], accuracy: 1 },
        {answer:[ 12.2 ], accuracy: 0.6 },
        {answer:[ 12.4 ], accuracy: 0.4 },
        {answer:[ 10.8 ], accuracy: 0.1 },
      ]
    },
    {
      variables: [15, 2],
      answer: [15.13],
      complexity: 2,
      paths:[
        { answer:[ 15.13 ], accuracy: 1 },
        {answer:[ 12.39 ], accuracy: 0.3 },
        {answer:[ 13.2 ], accuracy: 0.7 },
        {answer:[ 22 ], accuracy: 0 },
      ]
    },
    {
      variables: [41, 17],
      answer: [44.38],
      complexity: 2,
      paths:[
        { answer:[ 44.38 ], accuracy: 1 },
        {answer:[ 43.12 ], accuracy: 0.7 },
        {answer:[ 45 ], accuracy: 0.2 },
        {answer:[ 46.77 ], accuracy: 0.5 },
      ]
    },
    {
      variables: [7, 6],
      answer: [9.22],
      complexity: 2,
      paths:[
        { answer:[ 9.22 ], accuracy: 1 },
        {answer:[ 8 ], accuracy: 0.7 },
        {answer:[ 10.5 ], accuracy: 0.5 },
        {answer:[ 10 ], accuracy: 0.2 },
      ]
    }
  ]
});

// Probabilidad y estadistica
// Tambien incluye a la pregunta 10
const question27 = new Question({
  statement: 'Obtén la mediana del siguiente conjunto de datos: $1, $2, $3, $4, $5',
  general_topic: 'Estadistica',
  topic: 'Analisis de datos',
  description: 'Los números pueden ser decimales o fracciones',
  complexity: 1,
  image: null,
  options: [
    {
      variables: [23, 45, 32, 67, 90],
      answer: [45],
      complexity: 1,
      paths:[
        { answer:[ 45 ], accuracy: 1 },
        {answer:[ 35 ], accuracy: 0.3 },
        {answer:[ 55 ], accuracy: 0.6 },
        {answer:[ 48 ], accuracy: 0.9 },
      ]
    },
    {
      variables: [10, 8, 11, 17, 20],
      answer: [11],
      complexity: 1,
      paths:[
        { answer:[ 11 ], accuracy: 1 },
        {answer:[ 15 ], accuracy:  0.6 },
        {answer:[ 16 ], accuracy: 0.3 },
        {answer:[ 12 ], accuracy: 0.8 },
      ]
    },
    {
      variables: [1, 3, 5, 7, 9],
      answer: [5],
      complexity: 1,
      paths:[
        { answer:[ 5 ], accuracy: 1 },
        {answer:[ 10 ], accuracy: 0.2 },
        {answer:[ 6 ], accuracy: 0.8 },
        {answer:[ 8 ], accuracy: 0.5 },
      ]
    },
    {
      variables: [4, 1, 0, 9, 10],
      answer: [4],
      complexity: 1,
      paths:[
        { answer:[ 4 ], accuracy: 1 },
        {answer:[ 6 ], accuracy: 0.6 },
        {answer:[ 8 ], accuracy: 0.2 },
        {answer:[ 2 ], accuracy: 0.6 },
      ]
    },
    {
      variables: [12, 5, 13, 6, 3],
      answer: [6],
      complexity: 1,
      paths:[
        { answer:[ 5 ], accuracy: 0.7 },
        {answer:[ 10 ], accuracy: 0.3 },
        {answer:[ 6 ], accuracy: 1 },
        {answer:[ 2.5 ], accuracy: 0.2 },
      ]
    }
  ]
});
const question28 = new Question({
  statement: 'Obtén la moda del siguiente conjunto de datos: $1, $2, $3, $4, $5',
  general_topic: 'Estadistica',
  topic: 'Analisis de datos',
  description: 'Los números pueden ser decimales o fracciones',
  complexity: 1,
  image: null,
  options: [
    {
      variables: [23, 45, 23, 67, 90],
      answer: [23],
      complexity: 1,
      paths:[
        { answer:[ 23 ], accuracy: 1 },
        {answer:[ 32 ], accuracy: 0.6 },
        {answer:[ 42 ], accuracy: 0.4 },
        {answer:[ 24 ], accuracy:0.5 },
      ]
    },
    {
      variables: [0, 0, 0, 0, 0],
      answer: [0],
      complexity: 1,
      paths:[
        { answer:[ 0 ], accuracy: 1 },
        {answer:[ 1 ], accuracy: 0.1 },
        {answer:[ 10 ], accuracy: 0 },
        {answer:[ -5 ], accuracy:0 },
      ]
    },
    {
      variables: [1, 2, 1, 2, 1],
      answer: [1],
      complexity: 1,
      paths:[
        { answer:[ 1 ], accuracy: 1 },
        {answer:[ 2 ], accuracy: 0.6 },
        {answer:[ 0 ], accuracy: 0.6 },
        {answer:[ -1 ], accuracy:0.2 },
      ]
    },
    {
      variables: [4, 10, 5, 4, 3],
      answer: [4],
      complexity: 1,
      paths:[
        { answer:[ 4 ], accuracy: 1 },
        {answer:[ 8 ], accuracy: 0.5 },
        {answer:[ 2 ], accuracy: 0.5 },
        {answer:[ 1 ], accuracy:0.1 },
      ]
    },
    {
      variables: [100, 1000, 100, 1000, 100],
      answer: [100],
      complexity: 1,
      paths:[
        { answer:[ 100 ], accuracy: 1 },
        {answer:[ 10 ], accuracy: 0.4 },
        {answer:[ 1000 ], accuracy: 0.4},
        {answer:[ 200 ], accuracy:0.6},
      ]
    }
  ]
});

const seed = async () => {
  try {
    if (!fs.existsSync(path.resolve(__dirname, '../../files'))) {
      fs.mkdirSync(path.resolve(__dirname, '../../files'));
    }
    await sqlConnection();
    await nosqlConnection();
    logger.warn('Creating seed records');
    await student1.save();
    await student2.save();
    await student3.save();
    await student4.save();
    await student5.save();
    await student6.save();
    await student7.save();
    await student8.save();
    await student9.save();
    await student10.save();
    logger.warn('Students created');
    await teacher1.save();
    await teacher2.save();
    logger.warn('Teachers created');
    await group1.save();
    await group2.save();
    await group3.save();
    await group4.save();
    await group5.save();
    logger.warn('Groups created');
    await enroll1.save();
    await enroll2.save();
    await enroll3.save();
    await enroll4.save();
    await enroll5.save();
    await enroll6.save();
    await enroll7.save();
    await enroll8.save();
    await enroll9.save();
    await enroll10.save();
    await enroll11.save();
    await enroll12.save();
    await enroll13.save();
    logger.warn('Enrolls created');
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
    await question17.save();
    await question18.save();
    await question19.save();
    await question20.save();
    await question21.save();
    await question22.save();
    await question23.save();
    await question24.save();
    await question25.save();
    await question26.save();
    await question27.save();
    await question28.save();
    logger.warn('Questions created');
    process.exit(0);
  } catch (err) {
    console.trace(err);
    logger.error(err);
  }
};

seed();
