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
    const favLists = await getAllFavLists();
    console.log('[SUCCESS]: Showing all favLists');
    return res.status(200).json({ favLists, message: 'Showing all favLists' });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function getAllUserFavListsHandler(req, res) {
  const { id } = req.user;
  try {
    const userFavs = await getAllUserFavLists(id);
    console.log('[SUCCESS]: Showing all User favLists');
    return res
      .status(200)
      .json({ userFavs, message: 'Showing all user favLists' });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(501).json({ error });
  }
}

async function getSingleFavListHandler(req, res) {
  const { id } = req.params;
  try {
    const favList = await getSingleFavList(id);

    if (!favList) {
      console.log('[WARINING]: FavList not found');
      return res.status(404).json({ message: 'FavList not found' });
    }
    console.log('[SUCCESS]: Showing favList', favList);
    return res.json({ favList, message: `Showing favList id:${favList.id}` });
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
    console.log('[SUCCESS]: FavList created');

    return res.status(201).json({
      favList,
      message: `FavList successfuly created`,
    });
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
      console.log('[WARINING]: FavList not found');
      return res.status(404).json({ message: 'FavList not found' });
    }
    console.log('[SUCCESS]: User id:', id, 'Data updated:', updateFavListData);
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
      console.log('[WARINING]: FavList not found');
      return res.status(404).json({ message: 'FavList not found' });
    }
    console.log(`[SUCCESS]: FavList ${id} eliminated`);
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
