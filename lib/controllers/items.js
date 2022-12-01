const { Router } = require('express');
const Item = require('../models/Item.js');
const authorize = require('../middleware/authorize.js');
const authenticate = require('../middleware/authenticate.js');

module.exports = Router()
  .get('/', [authenticate], async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .post('/', [authenticate], async (req, res, next) => {
    try {
      const newItem = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const updateItem = await Item.updateById(req.params.id, req.body);
      res.json(updateItem);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', [authenticate, authorize], async (req, res, next) => {
    try {
      const deleteItem = await Item.delete(req.params.id);
      res.json(deleteItem);
    } catch (e) {
      next(e);
    }
    // comment for commit
  });

// TO DO - implement items CRUD
