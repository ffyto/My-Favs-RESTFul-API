const services = require('./favLists.services');

const {
  addFavListToUser,
  deleteFavListAtUser,
} = require('../users/users.services');

const {
  createFavList,
  getAllFavLists,
  getSingleFavList,
  updateFavList,
  deleteFavList,
  getAllUserFavLists,
} = services;

async function getAllFavListsHandler(_req, res) {
  try {
    const favs = await getAllFavLists();
    console.log('Showing all favLists');
    return res.status(200).json(favs);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(501).json({ error });
  }
}

async function getAllUserFavListsHandler(req, res) {
  const { id } = req.user;
  try {
    const userFavs = await getAllUserFavLists(id);
    console.log('Showing all User favLists');
    return res.status(200).json(userFavs);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(501).json({ error });
  }
}

async function getSingleFavListHandler(req, res) {
  const { id } = req.params;
  try {
    const fav = await getSingleFavList(id);

    if (!fav) {
      console.log('FavList not found');
      return res.status(404).json({ message: 'FavList not found' });
    }
    console.log('Showing favList', fav);
    return res.json(fav);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function createFavListHandler(req, res) {
  const { id } = req.user;
  const tempFavListData = req.body;
  const favListData = { ...tempFavListData, owner: id };

  try {
    const favList = await createFavList(favListData);

    await addFavListToUser(id, favList.id);
    console.log('FavList created');

    return res.status(201).json(favList);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function updateFavListHandler(req, res) {
  const { id } = req.params;

  const updateFavListData = req.body;
  try {
    const favList = await updateFavList(id, updateFavListData);

    if (!favList) {
      console.log('FavList not found');
      return res.status(404).json({ message: 'FavList not found' });
    }
    console.log('User id:', id, 'Data updated:', updateFavListData);
    return res.json(favList);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function deleteFavListHandler(req, res) {
  const { id } = req.params;
  const user = await req.user;
  try {
    let fav = await getSingleFavList(id);

    await deleteFavListAtUser(user.id, fav.id);

    fav = await deleteFavList(id);
    if (!fav) {
      console.log('FavList not found');
      return res.status(404).json({ message: 'FavList not found' });
    }

    return res.json({ message: 'FavList eliminated' });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllFavListsHandler,
  getSingleFavListHandler,
  createFavListHandler,
  updateFavListHandler,
  deleteFavListHandler,
  getAllUserFavListsHandler,
};
