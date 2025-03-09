const express = require('express');
const restaurantRouter = express.Router();
const { restaurantController } = require('../controllers');

// Signup and login routes (no session auth required)
restaurantRouter.post('/signup', restaurantController.createRestaurant);
restaurantRouter.post('/login', restaurantController.loginRestaurant);
restaurantRouter.post('/logout', restaurantController.logoutRestaurant);

// Public endpoints (no session auth required)
restaurantRouter.get('/', restaurantController.getRestaurants);

// Restaurant-specific endpoints (require the restaurant to be logged in)
restaurantRouter.get('/:id', restaurantController.getRestaurant);
/**
 * @swagger
 * /api/restaurants/{id}:
 *   patch:
 *     summary: Update a restaurant's details
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 */
restaurantRouter.patch('/:id', restaurantController.updateRestaurant);
restaurantRouter.post('/:id/timings', restaurantController.addRestaurantTimings);
restaurantRouter.get('/:id/timings', restaurantController.getRestaurantTimings);
restaurantRouter.post('/:id/images', restaurantController.uploadRestaurantImage);
restaurantRouter.get('/:id/images', restaurantController.getRestaurantImages);
restaurantRouter.delete('/:id/images/:imageId', restaurantController.deleteRestaurantImage);
restaurantRouter.post('/:id/dishes', restaurantController.addDish);
restaurantRouter.get('/:id/dishes', restaurantController.getDishes);
restaurantRouter.get('/:id/dishes/:dishId', restaurantController.getDish);
restaurantRouter.patch('/:id/dishes/:dishId', restaurantController.updateDish);
restaurantRouter.delete('/:id/dishes/:dishId', restaurantController.deleteDish);
restaurantRouter.get('/:id/orders', restaurantController.getOrders);
restaurantRouter.get('/:id/orders/:orderId', restaurantController.getOrder);
restaurantRouter.patch('/:id/orders/:orderId', restaurantController.updateOrder);
restaurantRouter.delete('/:id/menu', restaurantController.deleteMenu);

module.exports = restaurantRouter;
