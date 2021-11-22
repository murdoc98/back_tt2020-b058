import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const router = Router();

// Swagger conf
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TT2020-B058 API',
      version: '0.1.0',
      description:
        'Api desarrollada y documentada para el TT2020-B058',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Escuela superior de computo',
        url: 'https://google.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:1025/api',
        description: 'Development server'
      },
    ]
  },
  apis: ['./src/docs/*.yml']
};
const specs = swaggerJsdoc(options);
router.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(specs, { explorer: true })
);
export default router;
