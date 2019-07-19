const express = require('express');
const assertValidity = require('../lib/utils/validate');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('pages/home');
  return next();
});

router.get('/users', async (req, res, next) => {
  const { userRepository } = res.locals;

  try {
    const users = await userRepository.list();
    res.render('pages/user/list', { users });
  } catch (err) {
    res.render('pages/500');
  }
  return next();
});

router.get('/users/:id', async (req, res, next) => {
  const { id } = req.params;
  const { userRepository } = res.locals;

  const isIdValid = assertValidity([{ value: id, type: 'number' }]);

  if (!isIdValid) {
    res.render('pages/404');
    // @TODO : Handle errors with error afterware
    return next();
  }

  try {
    const user = await userRepository.getById(id);
    res.render('pages/user/detail', { user });
  } catch (err) {
    res.render('pages/500');
  }
  return next();
});

router.get('/items', async (req, res, next) => {
  const { itemRepository } = res.locals;

  try {
    const items = await itemRepository.list();
    res.render('pages/item/list', { items });
  } catch (err) {
    res.render('pages/500');
  }
  return next();
});

router.get('/items/:id', async (req, res, next) => {
  const { id } = req.params;
  const { itemRepository } = res.locals;

  const isIdValid = assertValidity([{ value: id, type: 'number' }]);

  if (!isIdValid) {
    res.render('pages/404');
    // @TODO : Handle errors with error afterware
    return next();
  }

  try {
    const item = await itemRepository.getById(id);
    res.render('pages/item/detail', { item });
  } catch (err) {
    res.render('pages/500');
  }
  return next();
});

router.get('/orders', async (req, res, next) => {
  const { orderRepository } = res.locals;

  try {
    const orders = await orderRepository.list();
    res.render('pages/order/list', { orders });
  } catch (err) {
    res.render('pages/500');
  }
  return next();
});

router.get('/orders/:id', async (req, res, next) => {
  const { id } = req.params;
  const { orderRepository } = res.locals;

  const isIdValid = assertValidity([{ value: id, type: 'number' }]);

  if (!isIdValid) {
    res.render('pages/404');
    // @TODO : Handle errors with error afterware
    return next();
  }

  try {
    const order = await orderRepository.getById(id);
    const items = await orderRepository.getItemsByOrderId(id);

    res.render('pages/order/detail', { order, items });
  } catch (err) {
    res.render('pages/500');
  }
  return next();
});

module.exports = router;
