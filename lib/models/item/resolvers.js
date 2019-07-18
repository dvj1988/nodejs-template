/* eslint-disable no-restricted-globals */

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */
/**
 * Create item route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

const assertValidity = require('../../utils/validate');

async function createItem(req, res, next) {
  const { name, description } = req.body;
  const { itemRepository } = res.locals;

  const areFieldsValid = assertValidity([
    { value: name, type: 'string', minLength: 3 },
    { value: description, type: 'string', minLength: 3 }
  ]);

  if (!areFieldsValid) {
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  try {
    const [itemId] = await itemRepository.create({ name, description });

    const item = await itemRepository.getById(itemId);

    res.status(200).json({
      item,
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
 * Get item by id route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

async function getItemById(req, res, next) {
  const { id } = req.params;
  const { itemRepository } = res.locals;

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
    const item = await itemRepository.getById(id);

    if (!item) {
      res.status(400).json({
        error: true,
        message: 'Item not found'
      });

      return next();
    }

    res.status(200).json({
      item,
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
 * List items route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function listItems(req, res, next) {
  const { itemRepository } = res.locals;
  try {
    const items = await itemRepository.list();

    res.status(200).json({
      items,
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
 * Update item route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

async function updateItem(req, res, next) {
  const { id } = req.params;
  const { name, description } = req.body;
  const { itemRepository } = res.locals;

  if (!name && !description) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  const fields = [{ value: id, type: 'number' }];

  if (name) fields.push({ value: name, type: 'string', minLength: 3 });
  if (description) fields.push({ value: description, type: 'string', minLength: 3 });

  if (!assertValidity(fields)) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  try {
    await itemRepository.update(id, { name, description });
    const item = await itemRepository.getById(id);

    res.status(200).json({
      item,
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
 * Delete item route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function deleteItem(req, res, next) {
  const { id } = req.params;
  const { itemRepository } = res.locals;

  const isIdValid = assertValidity([{ value: id, type: 'number' }]);
  // @TODO: Add util for assertValidityation for numeric input
  if (!isIdValid) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  try {
    const item = await itemRepository.getById(id);

    if (!item) {
      res.status(400).json({
        error: true,
        message: 'Item not found'
      });
      return next();
    }

    await itemRepository.deleteById(id);

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
  createItem,
  listItems,
  getItemById,
  updateItem,
  deleteItem
};
