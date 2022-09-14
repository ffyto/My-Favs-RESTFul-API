const express = require('express');
const { isAuthenticated } = require('../../auth/auth.services');

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
router.get('/user', isAuthenticated, getAllUserFavsHandler);
router.get('/:id', getSingleFavHandler);
router.post('/:favListId', isAuthenticated, createFavHandler);
router.patch('/:id', isAuthenticated, updateFavHandler);
router.delete('/:id', isAuthenticated, deleteFavHandler);

module.exports = router;
