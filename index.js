require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const mongoData = process.env.DATABASE_URL;

mongoose.connect(mongoData);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database connected');
});

const app = express();

app.use(express.json());

const routes = require('./routes/routes');

app.use('/api', routes);

app.listen(8000, () => {
    console.log(`server started ${8000}`);
})