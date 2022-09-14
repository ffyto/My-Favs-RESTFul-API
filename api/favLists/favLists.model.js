const mongoose = require('mongoose');

const favListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
