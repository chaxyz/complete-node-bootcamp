process.on('uncaugthException ', (err) => {
  console.log('Uncaugth exception!....');
  console.log(err.name, err.message);
  process.exit(1);
});

const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
// run app after config environment
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
});

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection!...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
