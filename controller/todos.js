const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
  .getDb()
  .db('CSE341')
  .collection('todos')
  .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('CSE341')
    .collection('todos')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createToDo = async (req,res,next) => {
  const todo = {
    todaysDate: req.body.todaysDate,
    task: req.body.task,
    dueDate: req.body.dueDate,
    class: req.body.class,
    appointment: req.body.appointment,
    activities: req.body.activities,
    notes: req.body.notes
  };
  const response = await mongodb
  .getDb()
  .db('CSE341')
  .collection('todos')
  .insertOne(todo);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the todo.');
  }
};

const updateToDo = async (req,res,next) => {
  const userId = new ObjectId(req.params.id);
  const todo = {
    todaysDate: req.body.todaysDate,
    task: req.body.task,
    dueDate: req.body.dueDate,
    class: req.body.class,
    appointment: req.body.appointment,
    activities: req.body.activities,
    notes: req.body.notes
    };
  const response = await mongodb
  .getDb()
  .db('CSE341')
  .collection('todos')
  .replaceOne({ _id: userId }, todo);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the todo.');
  }
};

const deleteToDo = async (req,res,next) => {
  const userId = new ObjectId(req.params.id);
  // const todo = {
  //   todaysDate: req.body.todaysDate,
  //   task: req.body.task,
  //   dueDate: req.body.dueDate,
  //   class: req.body.class,
  //   appointment: req.body.appointment,
  //   activities: req.body.activities,
  //   notes: req.body.notes
  //   };
  const response = await mongodb
  .getDb()
  .db('CSE341')
  .collection('todos')
  .replaceOne({ _id: userId });
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the todo.');
  }
};




module.exports = {getAll, getSingle, createToDo, updateToDo, deleteToDo};