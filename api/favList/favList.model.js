const mongoose = require('mongoose');

const favListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    favs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fav',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FavList = mongoose.model('FavList', favListSchema);

module.exports = FavList;
