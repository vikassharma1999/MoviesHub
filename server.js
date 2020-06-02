require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.use(cors());
//API
app.use('/api/movies', require('./routes/movie'));
const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => res.send('API RUNNING..'));
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
