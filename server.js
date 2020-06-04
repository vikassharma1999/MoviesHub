require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//DB Connection
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected...'));

//init middleware
app.use(bodyParser.json());
app.use(cors());
//API
app.use('/api/movies', require('./routes/movie'));

// PORT
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
