const dotenv = require('dotenv');

// Handling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('❌ UNHANDLED EXCEPTION! Shutting down Server! ❌');
  console.log(err.name, err.message);
  // server.close gives time to the server to finish the requests that are being handled and then the process.exit shutdowns the server.
  process.exit(1);
});

// dotenv will read the files from configuration file and save them to NODEJS environment variables
dotenv.config({ path: './config/config.env' });
const app = require('./app');
const connectDB = require('./config/db');

// connect to database
connectDB();

const port = process.env.PORT || 6000;
const server = app.listen(port, () =>
  console.log(`App Running On Port ${port}`)
);

// used to handle unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log('❌ UNHANDLED REJECTION! Shutting down Server! ❌');
  console.log(err.name, err.message);
  // server.close gives time to the server to finish the requests that are being handled and then the process.exit shutdowns the server.
  server.close(() => {
    process.exit(1);
  });
});
