const FavList = require('./favLists.model');

function getAllFavLists() {
  return FavList.find({});
}

function getSingleFavList(id) {
  return FavList.findById(id);
}

function getAllUserFavLists(owner) {
  return FavList.find({ owner });
}

function createFavList(favList) {
  return FavList.create(favList);
}

function updateFavList(id, favList) {
  return FavList.findByIdAndUpdate(id, favList, { new: true });
}

function deleteFavList(id) {
  return FavList.findByIdAndDelete(id);
}

function addFavToFavList(id, favId) {
  return FavList.findByIdAndUpdate(
    id,
    { $push: { favs: favId } },
    { new: true }
  );
}

function deleteFavAtFavList(favId, id) {
  return FavList.findByIdAndUpdate(
    id,
    { $pull: { favs: favId } },
    { multi: true }
  );
}

module.exports = {
  getAllFavLists,
  getSingleFavList,
  getAllUserFavLists,
  createFavList,
  updateFavList,
  addFavToFavList,
  deleteFavAtFavList,
  deleteFavList,
};
