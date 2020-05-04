const express = require('express');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
const userRouter = require('./routes/user');

/*****************Global Middlwares Start************************/
/**
 * this is bodyParser middleware
 * data from body is added to the request object with this step
 * using the limit limts the data sent by the user to be less than or equal to 10 KB
 */
app.use(express.json({ limit: '10kb' }));
/*****************Helper Methods End************************/

/*****************API Routes Start************************/
app.use('/api/v1/users', userRouter);
/*****************API Routes End************************/

/**
 * Global Error Handling Middleware
 * by adding 4 parameters, express knows that this is the error handling middleware
 */
app.use(globalErrorHandler);

module.exports = app;
