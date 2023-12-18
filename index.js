const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port = 8000;

let swaggerDefinition = {
    servers: [{url: `http://localhost:${port}/api`}],
    info: {
        title: 'Digital Store API',
        version: '1.0.0',
        description: 'Documentação da api'
    },
    components: {
        schemas: require('./schemas.json')
    }
}

let options = {
    swaggerDefinition,
    apis: ['./routes/*.js']
}

let swaggerSpec = swaggerJSDoc(options);

const brandRoutes = require('./routes/brandRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const genderRoutes = require('./routes/genderRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());

const hasToken = (req, res, next) => {
    const body = req.body;
    if(!body.token){
        return res.send('Token invalido')
    }
    next();
}
app.use(hasToken);

app.get('/', (request, response) => {
    response.send('Bem vindo à API da Digital Store');
});

/**
 * @swagger
 * /marcas:
 *  get: 
 *      tags:
 *          - Marcas
 *      description:
 *          - Traz a lista de marcas
 *      produces:
 *          - application/json
 *      response: 
 *          200:
 *              description: Retorna uma lista de marcas
 *              schema: 
 *                  $ref: '#components/schemas/Brand'
 */
/**
 * @swagger
 * /marcas/{:id}:
 *  get: 
 *      tags:
 *          - Marcas
 *      description:
 *          - Traz a uma marca
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: brand_id
 *              in: path
 *              required: true
 *      response: 
 *          200:
 *              description: Retorna uma marcas
 *              schema: 
 *                  $ref: '#components/schemas/Brand'
 *          400: 
 *              description: Marca não encontrada
 */



app.use('/user', userRoutes);
app.use('/marcas', brandRoutes);
app.use('/categorias', categoriesRoutes);
app.use('/generos', genderRoutes);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.all('*', (req, res) => {
    res.status(404).send('Rota não encontrada');
});

app.listen(port, () => {
    console.log(`Servidor de pé na url: http://localhost:${port}`);
});
