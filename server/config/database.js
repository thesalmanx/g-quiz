const mongoose = require('mongoose');

require('dotenv').config();

const DB_CONNECT = process.env.DB_CONNECT;

    mongoose.connect(DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false, 
    });

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });

