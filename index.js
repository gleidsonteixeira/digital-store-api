const express = require('express');
const cors = require('cors');
const brandRoutes = require('./routes/brandRoutes');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    response.send('Bem vindo à API da Digital Store');
});

app.use('/marcas', brandRoutes);

app.listen(port, () => {
    console.log(`Servidor de pé na url: http://localhost:${port}`);
});
