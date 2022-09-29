const express = require('express');

const {
  getAllFavsHandler,
  getSingleFavHandler,
  getAllUserFavsHandler,
  createFavHandler,
  updateFavHandler,
  deleteFavHandler,
} = require('./favs.controller');

const router = express.Router();

router.get('/', getAllFavsHandler);
router.get('/user', getAllUserFavsHandler);
router.get('/:id', getSingleFavHandler);
router.post('/:favListId', createFavHandler);
router.patch('/:id', updateFavHandler);
router.delete('/:id', deleteFavHandler);

module.exports = router;
