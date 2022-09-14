const { Router } = require('express');

const { loginUserHandler } = require('./local.controller');

const { validateLogin } = require('../../api/users/users.joiSchema');

const router = Router();

router.post('/login', validateLogin, loginUserHandler);

module.exports = router;
