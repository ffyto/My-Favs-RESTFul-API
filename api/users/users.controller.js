const crypto = require('crypto');

const services = require('./users.services');

const { createUser, getAllUsers, getSingleUser, updateUser, deleteUser } =
  services;

async function getAllUsersHandler(req, res) {
  try {
    const users = await getAllUsers();
    console.log('[SUCCESS]: Showing all users');
    return res.status(200).json(users);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function getSingleUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getSingleUser(id);

    if (!user) {
      return res.status(404).json({ message: '[WARNING]: User not found' });
    }
    console.log(`[SUCCESS]: Showing user ${user.id}`);
    return res.json(user);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function createUserHandler(req, res) {
  const userData = req.body;

  try {
    const hash = crypto
      .createHash('sha256')
      .update(userData.email)
      .digest('hex');

    userData.passwordResetActivationToken = hash;
    userData.passwordResetActivationExpires = Date.now() + 3_600_000 * 24;

    const user = await createUser(userData);

    console.log('[SUCCESS]: User created successfully', user);
    return res.status(201).json(user.profile);
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

async function updateUserHandler(req, res) {
  const userUpdate = req.body;
  const { id } = req.user;

  try {
    const user = await updateUser(id, userUpdate);
    console.log('[SUCCESS]: User id:', id, 'Data updated:', userUpdate);
    return res
      .status(200)
      .json({ message: 'User updated', profile: user.profile });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ message: 'Error updating user', error });
  }
}

async function deleteUserHandler(req, res) {
  const { id } = req.user;

  try {
    await deleteUser(id);
    console.log(`[SUCCESS]: User ${id} eliminated`);
    return res.status(200).json({ message: 'User eliminated' });
  } catch (error) {
    console.error(`[ERROR]: ${error}`);
    return res.status(500).json({ error });
  }
}

module.exports = {
  getAllUsersHandler,
  getSingleUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
