const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
const userRouter = require('./routes/user');
const profileRouter = require('./routes/profile');
const postsRouter = require('./routes/posts');

/*****************Global Middlwares Start************************/
/* 
    Development Logging 
    Middleware to log the type of request to console
*/
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/*
    this is bodyParser middleware
    data from body is added to the request object with this step
    using the limit limts the data sent by the user to be less than or equal to 10 KB
*/
app.use(express.json({ limit: '10kb' }));
/*****************Helper Methods End************************/

/*****************API Routes Start************************/
app.use('/api/v1/users', userRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/posts', postsRouter);
/*****************API Routes End************************/

/**
 * Global Error Handling Middleware
 * by adding 4 parameters, express knows that this is the error handling middleware
 */
app.use(globalErrorHandler);

module.exports = app;
