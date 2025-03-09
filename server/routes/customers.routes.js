const express = require('express');
const customerRouter = express.Router();
const { customerController } = require('../controllers');

// Signup and login routes (no session auth required)
/**
 * @swagger
 * /api/customers/signup:
 *   post:
 *     summary: Create a new customer account
 *     tags: [Customers]
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
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile_picture:
 *                 type: string
 *               country:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Missing required fields
 */
customerRouter.post('/signup', customerController.createCustomer);

/**
 * @swagger
 * /api/customers/login:
 *   post:
 *     summary: Login to customer account
 *     tags: [Customers]
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
 *       401:
 *         description: Invalid credentials
 */
customerRouter.post('/login', customerController.loginCustomer);
/**
 * @swagger
 * /api/customers/logout:
 *   post:
 *     summary: Logout from customer account
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
customerRouter.post('/logout', customerController.logoutCustomer);

/**
 * @swagger
 * /api/customers/session:
 *   get:
 *     summary: Get current customer session
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Current session info
 *       401:
 *         description: No active session
 */
customerRouter.get('/session', customerController.getSession);

// Customer-specific endpoints (require the customer to be logged in)
/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get customer details by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details retrieved
 *       401:
 *         description: Unauthorized
 */
customerRouter.get('/:id', customerController.getCustomerById);
/**
 * @swagger
 * /api/customers/{id}:
 *   patch:
 *     summary: Update customer details
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               state:
 *                 type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 */
customerRouter.patch('/:id', customerController.updateCustomer);

/**
 * @swagger
 * /api/customers/{id}/profile_picture:
 *   put:
 *     summary: Update customer profile picture
 *     tags: [Customers]
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
 *               - profile_picture
 *             properties:
 *               profile_picture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile picture updated
 */
customerRouter.put('/:id/profile_picture', customerController.updateProfilePicture);
customerRouter.get('/:id/orders', customerController.getCustomerOrders);

/**
 * @swagger
 * /api/customers/{id}/cart:
 *   get:
 *     summary: Get customer's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart items retrieved
 *   delete:
 *     summary: Clear customer's cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */
customerRouter.get('/:id/cart', customerController.getCustomerCart);
customerRouter.delete('/:id/cart', customerController.clearCustomerCart);

/**
 * @swagger
 * /api/customers/{id}/cart/items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
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
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added to cart
 */
customerRouter.post('/:id/cart/items', customerController.addItemToCart);
customerRouter.patch('/:id/cart/items/:itemId', customerController.updateCartItem);
/**
 * @swagger
 * /api/customers/{id}/cart/items/{itemId}:
 *   delete:
 *     summary: Delete specific item from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID to remove
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 */
customerRouter.delete('/:id/cart/items/:itemId', customerController.deleteCartItem);

/**
 * @swagger
 * /api/customers/{id}/favorites:
 *   get:
 *     summary: Get customer's favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favorites retrieved
 *   post:
 *     summary: Add to favorites
 *     tags: [Favorites]
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
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Added to favorites
 */
customerRouter.get('/:id/favorites', customerController.getFavorites);
/**
 * @swagger
 * /api/customers/{id}/favorites:
 *   post:
 *     summary: Add a product to customer's favorites
 *     description: Adds a product to the customer's list of favorite items.
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the customer
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: Unique identifier of the product to be added to favorites
 *     responses:
 *       201:
 *         description: Product successfully added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to favorites
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       404:
 *         description: Customer or product not found
 *       500:
 *         description: Internal server error
 */
customerRouter.post('/:id/favorites', customerController.addFavorite);
/**
 * @swagger
 * /api/customers/{id}/favorites/{favoriteId}:
 *   delete:
 *     summary: Remove item from favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *       - in: path
 *         name: favoriteId
 *         required: true
 *         schema:
 *           type: string
 *         description: Favorite item ID to remove
 *     responses:
 *       200:
 *         description: Favorite removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Favorite not found
 */
customerRouter.delete('/:id/favorites/:favoriteId', customerController.deleteFavorite);

module.exports = customerRouter;