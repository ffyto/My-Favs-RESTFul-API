const express = require('express');
const { isAuthenticated } = require('../../auth/auth.services');
const {
  createFavListHandler,
  getAllFavListsHandler,
  getSingleFavListHandler,
  updateFavListHandler,
  deleteFavListHandler,
  getAllUserFavListsHandler,
} = require('./favList.controller');

const router = express.Router();

router.get('/', getAllFavListsHandler);
router.get('/user', isAuthenticated, getAllUserFavListsHandler);
router.get('/:id', getSingleFavListHandler);
router.post('/', isAuthenticated, createFavListHandler);
router.patch('/:id', isAuthenticated, updateFavListHandler);
router.delete('/:id', isAuthenticated, deleteFavListHandler);

module.exports = router;
