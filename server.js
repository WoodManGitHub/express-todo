const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

const users = require('./api/routes/userRoute');
const todo = require('./api/routes/todoRoute');

const db = require('./config/config.json').database.dbUrl;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log('Database connected')).catch((err) => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/todo', todo);

app.listen(8000, '0.0.0.0', () => {
    console.log('Success');
});
