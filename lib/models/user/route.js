const express = require('express');

const userRouter = express.Router();
const {
  getUserById,
  listUsers,
  createUser,
  updateUser,
  deleteUser
} = require('./resolvers');

userRouter.post('/', createUser);
userRouter.get('/', listUsers);
userRouter.get('/:id', getUserById);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;
