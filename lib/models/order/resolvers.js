/* eslint-disable no-restricted-globals */

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * Create Order route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

const assertValidity = require('../../utils/validate');

async function createOrder(req, res, next) {
  const { userId } = req.body;
  const { orderRepository, userRepository } = res.locals;

  const isUserIdValid = assertValidity([{ value: userId, type: 'number' }]);

  if (!isUserIdValid) {
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });

    return next();
  }

  try {
    const user = await userRepository.getById(userId);

    if (!user) {
      res.status(400).json({
        error: true,
        message: 'User not found'
      });

      return next();
    }

    const [orderId] = await orderRepository.create({ userId });

    const order = await orderRepository.getById(orderId);

    res.status(200).json({
      order,
      success: true,
      message: 'SUCCESS'
    });

    return next();
  } catch (err) {
    res.status(400).json({
      error: true,
      message: 'Something went wrong.'
    });
    return next();
  }
}

/**
 * Create getOrder route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getOrderById(req, res, next) {
  const { id } = req.params;
  const { orderRepository } = res.locals;

  const isIdValid = assertValidity([{ value: id, type: 'number' }]);
  if (!isIdValid) {
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  try {
    const order = await orderRepository.getById(id);

    if (!order) {
      res.status(400).json({
        error: true,
        message: 'Order not found'
      });
      return next();
    }

    res.status(200).json({
      order,
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
 * Create List Orders route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function listOrders(req, res, next) {
  const { orderRepository } = res.locals;
  try {
    const orders = await orderRepository.list();

    res.status(200).json({
      orders,
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
 * Create get Order customer route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getOrderCustomer(req, res, next) {
  const { id } = req.params;
  const { userRepository, orderRepository } = res.locals;

  const isIdValid = assertValidity([{ value: id, type: 'number' }]);

  if (!isIdValid) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  const order = await orderRepository.getById(id);

  if (!order) {
    res.json({
      error: true,
      message: 'ERROR'
    });

    return next();
  }

  const { userId } = order;

  const user = await userRepository.getById(userId);

  res.json({
    user,
    success: true,
    message: 'SUCCESS'
  });

  return next();
}

/**
 * Create get Order items route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getOrderItems(req, res, next) {
  const { id } = req.params;
  const { orderRepository } = res.locals;

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
    const order = await orderRepository.getById(id);

    if (!order) {
      res.status(400).json({
        error: true,
        message: 'Order not found.'
      });

      return next();
    }

    const items = await orderRepository.getItemsByOrderId(id);

    res.status(200).json({
      items,
      success: true,
      message: 'SUCCESS'
    });
    return next();
  } catch (err) {
    res.status(400).json({
      error: true,
      message: 'Something went wrong.'
    });
    return next();
  }
}

/**
 * Create add Order items route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function addOrderItem(req, res, next) {
  const { id } = req.params;
  const { orderRepository, itemRepository } = res.locals;
  const { itemId, quantity } = req.body;

  const areFieldsValid = assertValidity([
    { value: id, type: 'number' },
    { value: itemId, type: 'number' },
    { value: quantity, type: 'number' }
  ]);

  if (!areFieldsValid) {
    // @TODO: Add common afterware to handle error codes
    res.status(400).json({
      error: true,
      message: 'Invalid input.'
    });
    return next();
  }

  try {
    const order = await orderRepository.getById(id);

    if (!order) {
      res.status(400).json({
        error: true,
        message: 'Order not found.'
      });
      return next();
    }

    const item = await itemRepository.getById(itemId);


    if (!item) {
      res.status(400).json({
        error: true,
        message: 'Item not found.'
      });
      return next();
    }

    const orderItems = await orderRepository.getItemsByOrderId(id);

    const isItemPresent = !!orderItems.find(i => i.id === itemId);

    if (isItemPresent) {
      await orderRepository.updateItemOfOrder(id, { itemId, quantity });
    } else {
      await orderRepository.addItemToOrder(id, { itemId, quantity });
    }

    const items = await orderRepository.getItemsByOrderId(id);

    res.status(200).json({
      items,
      success: true,
      message: 'SUCCESS'
    });
    return next();
  } catch (err) {
    res.status(400).json({
      error: true,
      message: 'ERROR'
    });
    return next();
  }
}

/**
 * Create Delete Order route resolver
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function deleteOrder(req, res, next) {
  const { id } = req.params;
  const { orderRepository } = res.locals;

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
    const order = await orderRepository.getById(id);

    if (!order) {
      res.status(400).json({
        error: true,
        message: 'Order not found'
      });
      return next();
    }

    await orderRepository.deleteById(id);

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
  createOrder,
  getOrderById,
  listOrders,
  getOrderCustomer,
  getOrderItems,
  deleteOrder,
  addOrderItem
};
