const express = require('express');
const controller = require('./users.controller');

const { registerLogin, userUpdateValidation } = require('./users.joiSchema');
const { isAuthenticated } = require('../../auth/auth.services');

const {
  createUserHandler,
  getSingleUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  updateUserHandler,
} = controller;

const router = express.Router();

router.get('/', getAllUsersHandler);
router.get('/:id', getSingleUserHandler);
router.post('/', registerLogin, createUserHandler);
router.patch('/', userUpdateValidation, isAuthenticated, updateUserHandler);
router.delete('/', isAuthenticated, deleteUserHandler);

module.exports = router;
