const { Router } = require('express');
const Item = require('../models/Item.js');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const items = await Item.getAll(req.user.id);
    res.json(items);
  } catch (e) {
    next(e);
  }
});

// TO DO - implement items CRUD
