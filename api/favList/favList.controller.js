const services = require('./favList.services');

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
    console.log('Showing all favs');
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
    console.log('Showing all User favs');
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
      console.log('Fav not found');
      return res.status(404).json({ message: 'Fav not found' });
    }
    console.log('Showing Fav', fav);
    return res.json(fav);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function createFavListHandler(req, res) {
  const { id } = req.user;
  const tempFavData = req.body;
  const favData = { ...tempFavData, owner: id };

  try {
    const fav = await createFavList(favData);

    await addFavListToUser(id, fav.id);
    console.log('Fav created');

    return res.status(201).json(fav);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function updateFavListHandler(req, res) {
  const { id } = req.params;

  const updateFavData = req.body;
  try {
    const fav = await updateFavList(id, updateFavData);

    if (!fav) {
      console.log('Fav not found');
      return res.status(404).json({ message: 'Fav not found' });
    }
    console.log('User id:', id, 'Data updated:', updateFavData);
    return res.json(fav);
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
      console.log('Fav not found');
      return res.status(404).json({ message: 'Fav not found' });
    }

    return res.json({ message: 'Fav eliminated' });
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
