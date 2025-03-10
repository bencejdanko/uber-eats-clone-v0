const express = require('express');
const restaurantRouter = express.Router();
const { restaurantController } = require('../controllers');

/**
 * @swagger
 * /api/restaurants/signup:
 *   post:
 *     summary: Create a new restaurant account
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       400:
 *         description: Missing required information
 */
restaurantRouter.post('/signup', restaurantController.createRestaurant);

/**
 * @swagger
 * /api/restaurants/login:
 *   post:
 *     summary: Login to restaurant account
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
restaurantRouter.post('/login', restaurantController.loginRestaurant);
/**
 * @swagger
 * /api/restaurants/logout:
 *   post:
 *     summary: Logout restaurant account
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Logged out successful
 *       500:
 *         description: Server error
 */
restaurantRouter.post('/logout', restaurantController.logoutRestaurant);
/**
 * @swagger
 * /api/restaurants/session:
 *   post:
 *     summary: Restaurant account session
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description:
 *       401:
 *         description: Unauthorized login
 */
restaurantRouter.get('/session', restaurantController.getSession);

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get paginated list of restaurants
 *     tags: [Restaurants]
 *     parameters:
 *       - in: body
 *         name: pagination
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               default: 1
 *             limit:
 *               type: integer
 *               default: 10
 *     responses:
 *       200:
 *         description: List of restaurants
 */
restaurantRouter.get('/', restaurantController.getRestaurants);
/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get specific restaurant
 *     tags: [Restaurants]
 *     properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Specific restaurant
 */
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
/**
 * @swagger
 * /api/restaurants/{id}/timings:
 *   put:
 *     summary: Update restaurant timing for a specific day
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - day_of_week
 *               - restaurant_id
 *             properties:
 *               day_of_week:
 *                 type: string
 *               open_time:
 *                 type: string
 *               close_time:
 *                 type: string
 *               closed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Timing updated successfully
 *       401:
 *         description: Unauthorized
 */
restaurantRouter.put('/:id/timings', restaurantController.putRestaurantTiming);
/**
 * @swagger
 * /api/restaurants/{id}/timings:
 *   get:
 *     summary: Get restaurant operating hours
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant timings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   day_of_week:
 *                     type: string
 *                   open_time:
 *                     type: string
 *                   close_time:
 *                     type: string
 *                   closed:
 *                     type: boolean
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Restaurant not found
 */
restaurantRouter.get('/:id/timings', restaurantController.getRestaurantTimings);
/**
 * @swagger
 * /api/restaurants/{id}/images:
 *   get:
 *     summary: Get restaurant images
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of restaurant images
 */
restaurantRouter.get('/:id/images', restaurantController.getRestaurantImages);
/**
 * @swagger
 * /api/restaurants/{id}/images/{imageId}:
 *   delete:
 *     summary: Delete a restaurant image
 *     description: Removes a specific image from the restaurant's image collection.
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the restaurant
 *         schema:
 *           type: string
 *       - in: path
 *         name: imageId
 *         required: true
 *         description: Unique identifier of the image to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image deleted successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       404:
 *         description: Restaurant or image not found
 *       500:
 *         description: Internal server error
 */
restaurantRouter.delete('/:id/images/:imageId', restaurantController.deleteRestaurantImage);

/**
 * @swagger
 * /api/restaurants/{id}/dishes:
 *   post:
 *     summary: Add a new dish to restaurant menu
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *     properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Dish added successfully
 *       401:
 *         description: Unauthorized
 */
restaurantRouter.put('/:id/dishes', restaurantController.putDishes);
/**
 * @swagger
 * /api/restaurants/{id}/dishes:
 *   get:
 *     summary: get all dishes from restaurant menu
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *          description: Successfully updated
 *       401:
 *         description: Unauthorized
 *       500:
 *          description: Internal server error
 */
restaurantRouter.get('/:id/dishes', restaurantController.getDishes);
/**
 * @swagger
 * /api/restaurants/{id}/dishes/{dishId}:
 *   get:
 *     summary: get specific dish from restaurant menu
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *          description: Successfully updated
 *       500:
 *          description: Internal server error
 */
restaurantRouter.get('/dishes/:dishId', restaurantController.getDish);
/**
 * @swagger
 * /api/restaurants/{id}/dishes/{dishId}:
 *   patch:
 *     summary: Update an existing dish
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *       - in: path
 *         name: dishId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of dish to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Dish updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dish not found
 */
restaurantRouter.patch('/:id/dishes/:dishId', restaurantController.updateDish);
/**
 * @swagger
 * /api/restaurants/{id}/dishes/{dishId}:
 *   delete:
 *     summary: Delete a dish
 *     description: Removes a specific dish from the restaurant's menu.
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the restaurant
 *         schema:
 *           type: string
 *       - in: path
 *         name: dishId
 *         required: true
 *         description: Unique identifier of the dish to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dish successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Dish deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Dish not found
 *       500:
 *         description: Internal server error
 */
restaurantRouter.delete('/:id/dishes/:dishId', restaurantController.deleteDish);
/**
 * @swagger
 * /api/restaurants/{id}/orders:
 *   get:
 *     summary: Get restaurant orders
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders
 */
restaurantRouter.get('/:id/orders', restaurantController.getOrders);

/**
 * @swagger
 * /api/restaurants/{id}/orders/{orderId}:
 *   get:
 *     summary: Get specific order details
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 */
restaurantRouter.get('/:id/orders/:orderId', restaurantController.getOrder);

/**
 * @swagger
 * /api/restaurants/{id}/orders/{orderId}:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       401:
 *         description: Unauthorized
 */
//restaurantRouter.patch('/:id/orders/:orderId', restaurantController.updateOrder);
/**
 * @swagger
 * /api/restaurants/{id}/menu:
 *   delete:
 *     summary: Deletes entire menu for the restaurant
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Specific restaurant's menu deleted successfully
 */
restaurantRouter.delete('/:id/menu', restaurantController.deleteMenu);

restaurantRouter.get('/:id/orders/items/special', restaurantController.getOrderItemsByRestaurantId);

restaurantRouter.patch('/:id/orders/items/:orderItemId', restaurantController.updateOrderItem);

module.exports = restaurantRouter;
