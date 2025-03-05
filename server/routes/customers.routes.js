const express = require('express');
const customerRouter = express.Router();

const { createCustomer } = require('../controllers');

// Customer Routes
customerRouter.post('/signup', createCustomer);
customerRouter.post('/login', null);
customerRouter.post('/logout', null);
customerRouter.get('/:id', null);
customerRouter.patch('/:id', null);
customerRouter.put('/:id/profile_picture', null);
customerRouter.get('/:id/orders', null);
customerRouter.get('/:id/cart', null);
customerRouter.delete('/:id/cart', null)
customerRouter.post('/:id/cart/items', null);
customerRouter.patch('/:id/cart/items/:itemId', null);
customerRouter.delete('/:id/cart/items/:itemId', null);
customerRouter.post('/:id/favorites', null);
customerRouter.get('/:id/favorites', null);
customerRouter.delete('/:id/favorites/:favoriteId', null);

exports.customerRouter = customerRouter;