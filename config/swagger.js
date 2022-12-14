const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const { version } = require('../package.json');

const PORT = process.env.PORT || 8080;
const routesApi = path.join(__dirname, '../api/**/**.routes.js');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Assessment Documentation',
      version,
      description:
        'This documentation describes the backend assessment implementation and functionality.',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'Mauricio Arango',
        url: 'https://www.linkedin.com/in/cmauricio-arango',
        email: 'cmauricio.arango@gmail.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/`,
        description: 'Local server',
      },
      {
        url: 'https://backend-assessment-mauro.herokuapp.com/',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        unauthorized: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'User is not authorized',
              example: 'User is not authorized',
            },
          },
        },
        deleted: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'The selected favList has been deleted',
              example: 'The selected favList has been deleted',
            },
          },
        },
        serverError: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Server crash',
              example: 'internal server error',
            },
          },
        },
        favLists: {
          type: 'array',
          description: 'An array of all favLists in the DB',
          example: [
            {
              name: 'My favorite songs',
              owner: 'cmauricio.arango',
              favs: ['Learn to fly', 'El Rito', 'Take a Picture'],
            },
            {
              name: 'My favorite movies',
              owner: 'cmauricio.arango',
              favs: ['Matrix', 'Harry Potter', 'Shutter Island'],
            },
            {
              name: 'My favorite foods',
              owner: 'cmauricio.arango',
              favs: ['Bandeja Paisa', 'fried chicken', 'Pineapple Pizza'],
            },
          ],
        },
        request: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the fav list',
              example: 'My Favorite Songs',
              default: 'My Favorite Songs',
            },
            owner: {
              type: 'ObjectId',
              description: 'Owner of the favList',
              example: '6321465fca34ef553baf579a',
            },
            favs: {
              type: 'array',
              description: 'Array of favs inside the favList',
              example: ['63214441c17750969c313f77', '632146bfca34ef553baf57a5'],
            },
          },
        },
        favList: {
          type: 'object',
          properties: {
            id: {
              type: 'ObjectId',
              description: 'Autogenerated id for the favList',
              example: '63214683ca34ef553baf579e',
            },
            name: {
              type: 'string',
              description: 'name of the fav list',
              example: 'List 1',
            },
            owner: {
              type: 'object',
              properties: {
                userName: {
                  type: 'string',
                  description: 'Username of the favList Owner',
                  example: 'cmauricio.arango',
                },
                email: {
                  type: 'string',
                  description: 'email of the favList Owner',
                  example: 'cmauricio.arango@gmail.com',
                },
                password: {
                  type: 'string',
                  description: 'Password of the favList Owner',
                  example: 'Password.example1',
                },
                name: {
                  type: 'string',
                  description: 'Name of the favList Owner',
                  example: 'Mauricio',
                },
                lastName: {
                  type: 'string',
                  description: 'Lastname of the favList Owner',
                  example: 'Arango',
                },
                favLists: {
                  type: 'array',
                  description: 'Array of all the user favLists',
                  example: 'cmauricio.arango',
                },
              },
            },
            favs: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'Title of the fav',
                  example: 'Foo Fighters: Learn to Fly',
                },
                description: {
                  type: 'string',
                  description: 'The description of the fav',
                  example: 'My all times favorite song',
                },
                link: {
                  type: 'string',
                  description: 'Link of the fav',
                  example: 'https://www.youtube.com/watch?v=1VQ_3sBZEm0',
                },
                favList: {
                  type: 'object',
                  description: 'FavList at which the fav belongs',
                  example: 'My Favorite Songs',
                },
                owner: {
                  type: 'object',
                  description: 'Owner of the fav',
                  example: 'cmauricio.arango',
                },
              },
            },
          },
        },
      },
    },
  },

  apis: [routesApi], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Swagger docs running on http://localhost:${PORT}/docs`);
}

module.exports = swaggerDocs;
