require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
//DB Connection
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connected...'));

const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => res.send('API RUNNING..'));
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
