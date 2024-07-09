const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

router.get('/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  res.json(order);
});

router.post('/', async (req, res) => {
  const newOrder = await Order.create(req.body);
  res.json(newOrder);
});

module.exports = router;
