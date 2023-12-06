const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('lista de gêneros');
});
router.post('/', (req, res) => {
    res.send(`cria uma gênero: ${JSON.stringify(req.body)}`);
});
router.post('/:id', (req, res) => {
    res.send(`edita a gênero de id ${req.params.id}`);
});
router.delete('/:id', (req, res) => {
    res.send(`deleta a gênero de id ${req.params.id}`);
});

module.exports = router;