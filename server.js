
//set-up the server here by imnporing express and other modules
const express = require('express');
const mongoose = require('mongoose');
const session = requier('express-session')

//create the server
const app = express();
const PORT = process.env.PORT || 5000;

//use middleware here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/acauto', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//set up the session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

//set up the routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/cars', require('./routes/api/cars'));
app.use('/api/reviews', require('./routes/api/reviews'));
app.use('/api/auth', require('./routes/api/auth'));

//start the server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
