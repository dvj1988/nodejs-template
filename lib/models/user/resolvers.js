/* eslint-disable no-restricted-globals */
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */
/**
 * Create user route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

const assertValidity = require('../../utils/validate');

async function createUser(req, res, next) {
  const { name, email } = req.body;
  const { userRepository } = res.locals;

  const areFieldsValid = assertValidity([
    { value: name, type: 'string', minLength: 3 },
    { value: email, type: 'email' }
  ]);


  if (!areFieldsValid) {
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  try {
    const [userId] = await userRepository.create({ name, email });

    const user = await userRepository.getById(userId);

    res.status(200).json({
      user,
      success: true,
      message: 'SUCCESS'
    });
    return next();
  } catch (err) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Something went wrong'
    });
    return next();
  }
}

/**
 * Get user by id route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getUserById(req, res, next) {
  const { id } = req.params;
  const { userRepository } = res.locals;

  const isIdValid = assertValidity([{ value: id, type: 'number' }]);

  if (!isIdValid) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  try {
    const user = await userRepository.getById(id);

    if (!user) {
      res.status(400).json({
        error: true,
        message: 'User not found'
      });
      return next();
    }

    res.status(200).json({
      user,
      success: true,
      message: 'SUCCESS'
    });
    return next();
  } catch (err) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Something went wrong'
    });
    return next();
  }
}

/**
 * List users route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function listUsers(req, res, next) {
  const { userRepository } = res.locals;
  try {
    const users = await userRepository.list();

    res.status(200).json({
      users,
      success: true,
      message: 'SUCCESS'
    });
    return next();
  } catch (err) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Something went wrong'
    });
    return next();
  }
}

/**
 * Update user route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function updateUser(req, res, next) {
  const { id } = req.params;
  const { name, email } = req.body;
  const { userRepository } = res.locals;

  if (!name && !email) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Atleast one field is mandatory'
    });
    return next();
  }

  const fields = [{ value: id, type: 'number' }];
  if (name) fields.push({ value: name, type: 'string', minLength: 3 });
  if (email) fields.push({ value: email, type: 'email' });

  if (!assertValidity(fields)) {
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  try {
    await userRepository.update(id, { name, email });
    const user = await userRepository.getById(id);

    res.status(200).json({
      user,
      success: true,
      message: 'SUCCESS'
    });
    return next();
  } catch (err) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Something went wrong'
    });
    return next();
  }
}

/**
 * Delete user route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function deleteUser(req, res, next) {
  const { id } = req.params;
  const { userRepository } = res.locals;

  const isIdValid = assertValidity([{ value: id, type: 'number' }]);

  if (!isIdValid) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  try {
    const user = await userRepository.getById(id);

    if (!user) {
      res.status(400).json({
        error: true,
        message: 'User not found'
      });
      return next();
    }

    await userRepository.deleteById(id);

    res.status(200).json({ success: true, message: 'SUCCESS' });
    return next();
  } catch (err) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Something went wrong'
    });
    return next();
  }
}

module.exports = {
  createUser,
  getUserById,
  listUsers,
  updateUser,
  deleteUser
};
