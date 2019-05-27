const express = require('express');
const router = express.Router();
const passport = require('passport');
const Todo = require('../models/todoModel');

router.get('/test', (req, res) => {
    res.json({message: 'Todo works.'});
});

router.post('/todoadd', passport.authenticate('jwt', {session: false}), (req, res) => {
    const todoFields = {};
    if (req.body.title) todoFields.title = req.body.title;
    
    new Todo(todoFields).save().then(todo => {
        res.json(todo); 
    });
});

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Todo.find().then(todo => {
        if (!todo)
            return res.status(404).json('No todo.');
        res.json(todo);
    }).catch((err) => res.status(404).json(err));
});

router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Todo.findOne({_id: req.params.id}).then(todo => {
        if (!todo)
            return res.status(404).json('No Todo.');
        res.json(todo);
    }).catch((err) => res.status(404).json(err));
});

router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const todoFields = {};
    if (req.body.title) todoFields.title = req.body.title;

    Todo.findOneAndUpdate({_id: req.params.id}, {$set: todoFields}, {new: true});
});

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Todo.findOneAndRemove({_id: req.params.id}).then(todo => {
        todo.save().then(todo => res.json(todo));
    }).catch((err) => res.status(404).json('Delete failed.'));
});

module.exports = router;
