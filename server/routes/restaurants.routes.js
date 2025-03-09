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
restaurantRouter.get('/:id/timings', restaurantController.getRestaurantTimings);
restaurantRouter.post('/:id/images', restaurantController.uploadRestaurantImage);
restaurantRouter.get('/:id/images', restaurantController.getRestaurantImages);
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
 *       201:
 *         description: Dish added successfully
 *       401:
 *         description: Unauthorized
 */
restaurantRouter.post('/:id/dishes', restaurantController.addDish);
restaurantRouter.get('/:id/dishes', restaurantController.getDishes);
restaurantRouter.get('/:id/dishes/:dishId', restaurantController.getDish);
restaurantRouter.patch('/:id/dishes/:dishId', restaurantController.updateDish);
restaurantRouter.delete('/:id/dishes/:dishId', restaurantController.deleteDish);
restaurantRouter.get('/:id/orders', restaurantController.getOrders);
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
restaurantRouter.patch('/:id/orders/:orderId', restaurantController.updateOrder);
restaurantRouter.delete('/:id/menu', restaurantController.deleteMenu);

module.exports = restaurantRouter;
