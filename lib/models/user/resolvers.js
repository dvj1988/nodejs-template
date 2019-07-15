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
async function createUser(req, res, next) {
  const { name, email } = req.body;
  const { userRepository } = res.locals;

  // Validate the input
  // @TODO: Add regex validation for name and email
  if (!name && !email) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: "Invalid input."
    });
  }

  try {
    const [userId] = await userRepository.create({ name, email });

    const user = await userRepository.getById(userId);

    res.status(200).json({
      user,
      success: true,
      message: "SUCCESS"
    });
  } catch (err) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: "Something went wrong"
    });
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

  // @TODO: Add util for validation for numeric input
  if (!id || isNaN(parseInt(id))) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: "Invalid input."
    });
  }
  try {
    const user = await userRepository.getById(id);

    if (!user) {
      res.status(400).json({
        error: true,
        message: "User not found"
      });
    }

    res.status(200).json({
      user,
      success: true,
      message: "SUCCESS"
    });
  } catch (err) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: "Something went wrong"
    });
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
      message: "SUCCESS"
    });
  } catch (err) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: "Something went wrong"
    });
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

  // @TODO: Add util for validation for numeric input
  if (!id || isNaN(parseInt(id))) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: "Invalid input."
    });
  }

  // @TODO: Add regex validation for name and email
  if (!name && !email) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: "Invalid input."
    });
  }

  try {
    await userRepository.update(id, { name, email });
    const user = await userRepository.getById(id);

    res.status(200).json({
      user,
      success: true,
      message: "SUCCESS"
    });
  } catch (err) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: "Something went wrong"
    });
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

  // @TODO: Add util for validation for numeric input
  if (!id || isNaN(parseInt(id))) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: "Invalid input."
    });
  }

  try {
    const user = await userRepository.getById(id);

    if (!user) {
      res.status(400).json({
        error: true,
        message: "User not found"
      });
    }

    await userRepository.deleteById(id);

    res.status(200).json({ success: true, message: "SUCCESS" });
  } catch (err) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: "Something went wrong"
    });
  }
}

module.exports = {
  createUser,
  getUserById,
  listUsers,
  updateUser,
  deleteUser
};
