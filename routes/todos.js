const express = require('express');
const router = express.Router();

const todosController = require('../controller/todos');

router.get('/', todosController.getAll);

router.get('/:id', todosController.getSingle);

router.post('/', todosController.createToDo);

router.put('/:id', todosController.updateToDo);

router.delete('/:id', todosController.deleteToDo);


module.exports = router;