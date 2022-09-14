const services = require('./favs.services');

const {
  getAllFavs,
  getAllUserFavs,
  getSingleFav,
  createFav,
  updateFav,
  deleteFav,
} = services;

const {
  addFavToFavList,
  deleteFavAtFavList,
} = require('../favLists/favLists.services');

async function getAllFavsHandler(req, res) {
  try {
    console.log('Showing all favs');
    const favs = await getAllFavs();
    return res.status(200).json(favs);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function getAllUserFavsHandler(req, res) {
  const { id } = req.user;
  try {
    const userFavs = await getAllUserFavs(id);
    console.log(`Showing all user ${id} favs`);
    return res.status(200).json(userFavs);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function getSingleFavHandler(req, res) {
  const { id } = req.params;
  try {
    const fav = await getSingleFav(id);
    if (!fav) {
      console.log('Fav not found');
      return res.status(404).json({ message: 'Fav not found' });
    }
    console.log('Showing fav', fav);
    return res.status(200).json(fav);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function createFavHandler(req, res) {
  const { favListId } = req.params;
  const owner = req.user;
  let FavData = req.body;
  FavData = { ...FavData, owner, favList: favListId };

  try {
    const fav = await createFav(FavData);
    await addFavToFavList(favListId, fav.id);
    console.log('Fav created', fav);
    return res.status(201).json(fav);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function updateFavHandler(req, res) {
  const { id } = req.params;
  const favData = req.body;
  try {
    const fav = await updateFav(id, favData);
    if (!fav) {
      console.log('Fav not found');
      return res.status(404).json({ message: 'Fav not found' });
    }
    console.log('Fav id:', id, 'Data updated:', favData);
    return res.status(200).json(fav);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function deleteFavHandler(req, res) {
  const { id } = req.params;
  try {
    const fav = await getSingleFav(id);
    if (!fav) {
      console.log('Fav not found');
      return res.status(404).json({ message: 'Fav not found' });
    }
    await deleteFavAtFavList(id, fav.favList);
    await deleteFav(id);
    console.log(`Fav ${id} eliminated`);
    return res.json({ message: 'Fav deleted successfully' });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllFavsHandler,
  getSingleFavHandler,
  getAllUserFavsHandler,
  createFavHandler,
  updateFavHandler,
  deleteFavHandler,
};
