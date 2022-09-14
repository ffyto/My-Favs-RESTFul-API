const mongoose = require('mongoose');

const FavSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
      required: true,
    },
    favList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FavList',
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Fav = mongoose.model('Fav', FavSchema);

module.exports = Fav;
