const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageurl: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = Movie = mongoose.model('Movie', MovieSchema);
