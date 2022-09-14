const User = require('./users.model');

function getAllUsers() {
  return User.find({});
}

function getSingleUser(id) {
  return User.findById(id).populate({ path: 'favLists', select: 'name' });
}

function findUserByEmail(email) {
  return User.findOne({ email });
}

function createUser(user) {
  return User.create(user);
}

function updateUser(id, user) {
  return User.findByIdAndUpdate(id, user, { new: true });
}

function deleteUser(id) {
  return User.findByIdAndRemove(id);
}

function addFavListToUser(id, favListId) {
  return User.findByIdAndUpdate(
    id,
    { $push: { favLists: favListId } },
    { new: true }
  );
}

function deleteFavListAtUser(id, favListId) {
  return User.findByIdAndUpdate(
    id,
    { $pull: { favLists: favListId } },
    { multi: true }
  );
}

module.exports = {
  getSingleUser,
  getAllUsers,
  addFavListToUser,
  deleteFavListAtUser,
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail,
};
