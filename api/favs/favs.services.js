const Fav = require('./favs.model');

function getAllFavs() {
  return Fav.find({});
}

function getAllUserFavs(owner) {
  return Fav.find({ owner });
}

function getSingleFav(id) {
  return Fav.findById(id);
}

function createFav(favListData) {
  return Fav.create(favListData);
}

function updateFav(id, updateFavListData) {
  return Fav.findByIdAndUpdate(id, updateFavListData);
}

function deleteFav(id) {
  return Fav.findByIdAndDelete(id);
}

module.exports = {
  getAllFavs,
  getSingleFav,
  createFav,
  updateFav,
  deleteFav,
  getAllUserFavs,
};
