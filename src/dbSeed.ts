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
enroll1.status = true;
const enroll2 = new Enrollment({
  student: student2,
  group: group1
});
//enroll2.status = true;

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
      complexity: 1
    },
    {
      variables: [98, 12, 14, 90],
      answer: [12, 24, 90, 98],
      complexity: 1
    }, 
    {
      variables: [17, 86, 34, 65],
      answer: [17, 34, 65, 86],
      complexity: 1
    },
    {
      variables: [56, 76, 94, 18],
      answer: [18, 56, 76, 94],
      complexity: 1
    },
    {
      variables: [23, 12, 45, 89],
      answer: [12, 23, 45, 89],
      complexity: 1
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
      complexity: 1
    },
    {
      variables: [14, 20],
      answer: [0.7],
      complexity: 1
    },
    {
      variables: [6, 16],
      answer: [0.375],
      complexity: 1
    },
    {
      variables: [14, 8],
      answer: [1.75],
      complexity: 1
    },
    {
      variables: [1, 2],
      answer: [0.5],
      complexity: 1
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
      complexity: 1
    },
    {
      variables: [2.75],
      answer: [11, 4],
      complexity: 1
    },
    {
      variables: [3.12],
      answer: [78, 25],
      complexity: 1
    },
    {
      variables: [0.36],
      answer: [9, 25],
      complexity: 1
    },
    {
      variables: [0.9],
      answer: [9, 10],
      complexity: 1
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
      complexity: 1
    },
    {
      variables: [56, '-', 32],
      answer: [24],
      complexity: 1
    },
    {
      variables: [67, '+', 1],
      answer: [1],
      complexity: 1
    },
    {
      variables: [77, '+', 33],
      answer: [110],
      complexity: 1
    },
    {
      variables: [12, '+', 23],
      answer: [35],
      complexity: 1
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
      complexity: 1
    },
    {
      variables: [12, 'x', 6],
      answer: [72],
      complexity: 1
    },
    {
      variables: [12, '/', 36],
      answer: [1, 3],
      complexity: 1
    },
    {
      variables: [6, '/', 18],
      answer: [1, 3],
      complexity: 1
    },
    {
      variables: [7, '*', 7],
      answer: [49],
      complexity: 1
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
      complexity: 1
    },
    {
      variables: [15, 12, 35],
      answer: [43.75],
      complexity: 1
    },
    {
      variables: [20, 5, 15],
      answer: [60],
      complexity: 1
    },
    {
      variables: [2, 9, 30],
      answer: [6.66],
      complexity: 1
    },
    {
      variables: [8, 16, 25],
      answer: [12.5],
      complexity: 1
    },
  ]
});
const question7 = new Question({
  statement: 'Si $1 kilos de tortillas vale $1 cuánto valdrán $3 kilos de tortillas?',
  general_topic: 'Numero, algebra y variacion',
  topic: 'Proporcionalidad, numeración, adición y sustracción.',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  complexity: 1,
  options: [
    {
      variables: [1, 1, 2],
      answer: [2],
      complexity: 1
    }
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
      variables: ['+', 7 , 8],
      answer: [1],
      complexity: 1
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
      complexity: 1
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
      complexity: 1
    }
  ]
});

// Area de figuras geometricas
const question11 = new Question({
  statement: 'Calcula el area del siguiente cuadrado en donde cada lado es igual a $ cm',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'area-cuadrado-x2.png',
  complexity: 1,
  options: [
    {
      variables: [1],
      answer: [1],
      complexity: 1
    },
    {
      variables: [7],
      answer: [49],
      complexity: 3
    },
    {
      variables: [2.5],
      answer: [6.25],
      complexity: 4
    },
    {
      variables: [5],
      answer: [25],
      complexity: 4
    },
    {
      variables: [3.5],
      answer: [12.25],
      complexity: 4
    }
  ]
});
const question12 = new Question({
  statement: 'Calcula el area del siguiente rectangulo en donde la base es igual a $ y la altura igual a $ m', 
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'area-rectangulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [1, 2],
      answer: [2],
      complexity: 1
    },
    {
      variables: [5, 10],
      answer: [50],
      complexity: 1
    },
    {
      variables: [3.3, 2.5],
      answer: [8.25],
      complexity: 4
    },
    {
      variables: [53, 8.1],
      answer: [437.25],
      complexity: 4
    },
    {
      variables: [5, 8.5],
      answer: [42.5],
      complexity: 3
    }
  ]
});
const question13 = new Question({
  statement: 'Calcula el area del siguiente rombo en donde la diagonal D es igual a $ y la diagonal d es igual a $ cm',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'area-rombo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [5, 15],
      answer: [37.5],
      complexity: 3
    },
    {
      variables: [10, 25],
      answer: [125],
      complexity: 2
    },
    {
      variables: [2.5, 5],
      answer: [6.25],
      complexity: 3
    },
    {
      variables: [15, 25],
      answer: [187.5],
      complexity: 2
    },
    {
      variables: [1.2, 3.5],
      answer: [2.1],
      complexity: 3
    }
  ]
});
const question14 = new Question({
  statement: 'Calcula el area del siguiente triangulo, donde la base b es igual a $ y la altura h es igual a $ m',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'area-circulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [1, 2],
      answer: [1],
      complexity: 1
    },
    {
      variables: [3, 10],
      answer: [15],
      complexity: 1
    },
    {
      variables: [4.5, 8.5],
      answer: [38.25],
      complexity: 3
    },
    {
      variables: [42.2, 53.7],
      answer: [1133.07],
      complexity: 4
    },
    {
      variables: [13, 20],
      answer: [130],
      complexity: 1
    }
  ]
});
const question15 = new Question({
  statement: 'Calcula el area del siguiente circulo, donde el radio es igual a $ cm donde el valor de pi = 3.1415',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'area-circulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [5],
      answer: [78.53],
      complexity: 1
    },
    {
      variables: [2.5],
      answer: [124.67],
      complexity: 3
    },
    {
      variables: [28],
      answer: [1276.34],
      complexity: 2
    },
    {
      variables: [10.3],
      answer: [101.65],
      complexity: 4
    },
    {
      variables: [5.33],
      answer: [52.60],
      complexity: 4
    }
  ]
});

// Perimetro de figuras geometricas
const question16 = new Question({
  statement: 'Calcula el perimetro del siguiente cuadrado donde el lado L es igual a $ m',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'perimetro-cuadrado-x2.png',
  complexity: 1,
  options: [
    {
      variables: [1],
      answer: [4],
      complexity: 1
    },
    {
      variables: [5],
      answer: [20],
      complexity: 1
    },
    {
      variables: [3.3],
      answer: [13.2],
      complexity: 2
    },
    {
      variables: [5.7],
      answer: [188],
      complexity: 2
    },
    {
      variables: [13.7],
      answer: [27.4],
      complexity: 3
    }

  ]
});
const question17 = new Question({
  statement: 'Calcula el perimetro del siguiente rectangulo donde la base L es igual a $ m y la altura l es igual a $ m',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'perimetro-rectangulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [5, 3],
      answer: [16],
      complexity: 1
    },
    {
      variables: [23, 35],
      answer: [116],
      complexity: 2
    },
    {
      variables: [5.7, 9.2],
      answer: [29.8],
      complexity: 3
    },
    {
      variables: [22.3, 28.9],
      answer: [102.4],
      complexity: 4
    },
    {
      variables: [55.72, 53.24],
      answer: [164.68],
      complexity: 5
    }
  ]
});
const question18 = new Question({
  statement: 'Calcula el perimetro del siguiente rombo donde el lado L es igual a $ cm',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'perimetro-rectangulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [8],
      answer: [32],
      complexity: 1
    },
    {
      variables: [37],
      answer: [148],
      complexity: 2
    },
    {
      variables: [8.7],
      answer: [34.8],
      complexity: 3
    },
    {
      variables: [73.7],
      answer: [294.8],
      complexity: 4
    },
    {
      variables: [83.24],
      answer: [332.96],
      complexity: 5
    }
  ]
});
const question19 = new Question({
  statement: 'Calcula el perimetro del siguiente tirangulo donde el lado L es igual a $ m',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'perimetro-rectangulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [5],
      answer: [15],
      complexity: 1
    },
    {
      variables: [37],
      answer: [111],
      complexity: 2
    },
    {
      variables: [5.7],
      answer: [17.1],
      complexity: 3
    },
    {
      variables: [67.3],
      answer: [201.9],
      complexity: 4
    },
    {
      variables: [26.37],
      answer: [79.11],
      complexity: 5
    }
  ]
});
const question20 = new Question({
  statement: 'Calcula el perimetro del siguiente circulo donde el radio r es igual a $ cm, tomando a pi = 3.1415',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'perimetro-circulo-x2.png',
  complexity: 1,
  options: [
    {
      variables: [2],
      answer: [12.57],
      complexity: 1
    },
    {
      variables: [37],
      answer: [232.47],
      complexity: 2
    },
    {
      variables: [7.3],
      answer: [45.86],
      complexity: 3
    },
    {
      variables: [76.6],
      answer: [481.27],
      complexity: 4
    },
    {
      variables: [37.73],
      answer: [237.05],
      complexity: 4
    }
  ]
});

// Volumen de figuras geometricas
const question21 = new Question({
  statement: 'Calcula el volumen del siguiente cilindro donde la altura h es igual a $ cm y el radio r es igual a $ cm, tomando pi = 3.1415',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'cilindro-png@2x.png',
  complexity: 1,
  options: [
    {
      variables: [5, 8],
      answer: [27.4],
      complexity: 1
    },
    {
      variables: [13, 17],
      answer: [9025.79],
      complexity: 2
    },
    {
      variables: [3.5, 5.6],
      answer: [215.51],
      complexity: 3
    },
    {
      variables: [12.2, 14.3],
      answer: [6686.60],
      complexity: 4
    },
    {
      variables: [14.21, 11.37],
      answer: [7217.71],
      complexity: 5
    }

  ]
});
const question22 = new Question({
  statement: 'Calcula el volumen del siguiente prisma rectangular donde la base x es igual a $ cm, y la altura y es igual a $ cm',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'cubo-png@2x.png',
  complexity: 1,
  options: [
    {
      variables: [5, 2],
      answer: [50],
      complexity: 1
    },
    {
      variables: [21, 12],
      answer: [5299],
      complexity: 2
    },
    {
      variables: [7.3, 5.7],
      answer: [303.75],
      complexity: 3
    },
    {
      variables: [11.2, 15.3],
      answer: [1919.23],
      complexity: 4
    },
    {
      variables: [12.11, 17.13],
      answer: [2537.08],
      complexity: 5
    },
  ]
});
const question23 = new Question({
  statement: 'Calcula el volumen de la siguiente esfera donde el radio r es igual a $ cm, tomando pi = 3.1415',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'esfera-png@2x.png',
  complexity: 1,
  options: [
    {
      variables: [4],
      answer: [268.08],
      complexity: 1
    },
    {
      variables: [12],
      answer: [7238.22],
      complexity: 2
    },
    {
      variables: [14.4],
      answer: [12507.66],
      complexity: 3
    },
    {
      variables: [4.17],
      answer: [303.73],
      complexity: 4
    },
    {
      variables: [12.17],
      answer: [7550.23],
      complexity: 5
    }
  ]
});
const question24 = new Question({
  statement: 'Calcula el volumen de la siguiente priamide rectangular donde la base b es igual a $ cm y la altura h es igual a $ cm',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'piramide-png@2x.png',
  complexity: 1,
  options: [
    {
      variables: [4, 5],
      answer: [106.67],
      complexity: 1
    },
    {
      variables: [12, 15],
      answer: [720],
      complexity: 2
    },
    {
      variables: [7.3, 5.4],
      answer: [383.69],
      complexity: 3
    },
    {
      variables: [13.4, 15.7],
      answer: [1292.83],
      complexity: 4
    },
    {
      variables: [14.12, 15.35],
      answer: [4080.53],
      complexity: 5
    }
  ]
});

// Teorema de Pitagoras
// Aplicar ternas pitagoricas
const question25 = new Question({
  statement: 'Calcula la longitud del cateto a tomando en cuenta que el cateto b es igual a $ y la hipotenusa c es igual a $',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'teorema-pitagoras-x2.png',
  complexity: 1,
  options: [
    {
      variables: [8, 4],
      answer: [],
      complexity: 1
    }
  ]
});
const question26 = new Question({
  statement: 'Calcula la longitud de la hipotenusa c tomando en cuenta que el cateto a es igual a $ y el cateto b es igual a $',
  general_topic: 'Magnitudes y medidas.',
  topic: 'Forma espacio y medida',
  description: 'Los números pueden ser decimales o fracciones',
  image: 'teorema-pitagoras-x2.png',
  complexity: 1,
  options: [
    {
      variables: [3, 4],
      answer: [5],
      complexity: 1
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
  image: null,
  options: [
    {
      variables: [23, 45, 32, 67, 90],
      answer: [45],
      complexity: 1
    }
  ]
});
const question28 = new Question({
  statement: 'Obtén la moda del siguiente conjunto de datos: $1, $2, $3, $4, $5',
  general_topic: 'Estadistica',
  topic: 'Analisis de datos',
  description: 'Los números pueden ser decimales o fracciones',
  image: null,
  options: [
    {
      variables: [23, 45, 23, 67, 90],
      answer: [23],
      complexity: 1
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
    logger.warn('Students created');
    await teacher1.save();
    await teacher2.save();
    logger.warn('Teachers created');
    await group1.save();
    logger.warn('Groups created');
    await enroll1.save();
    await enroll2.save();
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
  } catch(err) {
    logger.error(err);
  }
};

seed();
