const express = require('express');
const router = express.Router();
const controller = require('../controllers/brandController')

router.get('/', (req, res) => {
    controller.listar();
    res.send('lista de marcas nova');
});
router.post('/', (req, res) => {
    res.send(`cria uma marca: ${JSON.stringify(req.body)}`);
});
router.post('/:id', (req, res) => {
    res.send(`edita a marca de id ${req.params.id}`);
});
router.delete('/:id', (req, res) => {
    res.send(`deleta a marca de id ${req.params.id}`);
});

module.exports = router;