const { Router } = require('express');
const Item = require('../models/Item.js');
const authorize = require('../middleware/authorize.js');
const authenticate = require('../middleware/authenticate.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const newItem = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    console.log(req.body);
    try {
      const updateItem = await Item.updateById(req.params.id, req.body);
      console.log(updateItem);
      res.json(updateItem);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
