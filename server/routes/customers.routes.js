const express = require('express');
const customerRouter = express.Router();
const { customerController } = require('../controllers');

// Signup and login routes (no session auth required)
customerRouter.post('/signup', customerController.createCustomer);
customerRouter.post('/login', customerController.loginCustomer);
customerRouter.post('/logout', customerController.logoutCustomer);
customerRouter.get('/session', customerController.getSession);

// Customer-specific endpoints (require the customer to be logged in)
customerRouter.get('/:id', customerController.getCustomerById);
customerRouter.patch('/:id', customerController.updateCustomer);
customerRouter.put('/:id/profile_picture', customerController.updateProfilePicture);
customerRouter.get('/:id/orders', customerController.getCustomerOrders);
customerRouter.get('/:id/cart', customerController.getCustomerCart);
customerRouter.delete('/:id/cart', customerController.clearCustomerCart);
customerRouter.post('/:id/cart/items', customerController.addItemToCart);
customerRouter.patch('/:id/cart/items/:itemId', customerController.updateCartItem);
customerRouter.delete('/:id/cart/items/:itemId', customerController.deleteCartItem);
customerRouter.post('/:id/favorites', customerController.addFavorite);
customerRouter.get('/:id/favorites', customerController.getFavorites);
customerRouter.delete('/:id/favorites/:favoriteId', customerController.deleteFavorite);

module.exports = customerRouter;
