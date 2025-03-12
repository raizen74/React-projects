const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors'); // Import the cors package

const eventRoutes = require('./routes/events');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Allow requests from this origin
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use('/events', eventRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(8080);