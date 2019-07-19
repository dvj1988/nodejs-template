const express = require('express');

const router = express.Router();

router.get('/users', (req, res, next) => {
  res.render('pages/user/list');
  return next();
});
router.get('/users/:id', (req, res, next) => {
  res.render('pages/user/detail');
  return next();
});
router.get('/items', (req, res, next) => {
  res.render('pages/item/list');
  return next();
});
router.get('/items/:id', (req, res, next) => {
  res.render('pages/item/detail');
  return next();
});
router.get('/orders', (req, res, next) => {
  res.render('pages/order/list');
  return next();
});
router.get('/orders/:id', (req, res, next) => {
  res.render('pages/order/detail');
  return next();
});

module.exports = router;
