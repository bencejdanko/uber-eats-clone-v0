const { Restaurant, RestaurantTiming, RestaurantImage, Dish, Order } = require('../models');
const bcrypt = require('bcryptjs');

// Signup (create restaurant)
exports.createRestaurant = async (req, res) => {
  try {
    const { name, email, password, location } = req.body;
    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: 'Missing required information' });
    }
    const restaurant = await Restaurant.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      location,
    });
    res.status(201).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
exports.loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const restaurant = await Restaurant.findOne({ where: { email } });
    if (!restaurant) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = bcrypt.compareSync(password, restaurant.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Set restaurant id in session for authentication on protected endpoints
    req.session.restaurantId = restaurant.id;
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout
exports.logoutRestaurant = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Could not log out' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Helper: Check if restaurant is authenticated and authorized
const isAuthorized = (req) => {
  return req.session.restaurantId && parseInt(req.params.id) === req.session.restaurantId;
};

// Get restaurant details
exports.getRestaurant = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update restaurant details
exports.updateRestaurant = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    // Allow updating of basic fields (avoid password changes here)
    const { name, email, country, state } = req.body;
    await restaurant.update({ name, email, country, state });
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add RestaurantTimings
exports.addRestaurantTimings = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { day, openTime, closeTime } = req.body;
    if (!day || !openTime || !closeTime) {
      return res.status(400).json({ message: 'Missing RestaurantTiming information' });
    }
    const RestaurantTiming = await RestaurantTiming.create({
      restaurantId: req.params.id,
      day,
      openTime,
      closeTime,
    });
    res.status(201).json(RestaurantTiming);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get RestaurantTimings
exports.getRestaurantTimings = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const RestaurantTimings = await RestaurantTiming.findAll({ where: { restaurantId: req.params.id } });
    res.status(200).json(RestaurantTimings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload an RestaurantImage
exports.uploadRestaurantImage = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { RestaurantImageUrl } = req.body;
    if (!RestaurantImageUrl) {
      return res.status(400).json({ message: 'RestaurantImage URL is required' });
    }
    const RestaurantImage = await RestaurantImage.create({
      restaurantId: req.params.id,
      RestaurantImageUrl,
    });
    res.status(201).json(RestaurantImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get RestaurantImages
exports.getRestaurantImages = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const RestaurantImages = await RestaurantImage.findAll({ where: { restaurantId: req.params.id } });
    res.status(200).json(RestaurantImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an RestaurantImage
exports.deleteRestaurantImage = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { RestaurantImageId } = req.params;
    const RestaurantImage = await RestaurantImage.findOne({
      where: { id: RestaurantImageId, restaurantId: req.params.id }
    });
    if (!RestaurantImage) {
      return res.status(404).json({ message: 'RestaurantImage not found' });
    }
    await RestaurantImage.destroy();
    res.status(200).json({ message: 'RestaurantImage deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new dish
exports.addDish = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Missing required dish information' });
    }
    const dish = await Dish.create({
      restaurantId: req.params.id,
      name,
      description,
      price,
    });
    res.status(201).json(dish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all dishes
exports.getDishes = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const dishes = await Dish.findAll({ where: { restaurantId: req.params.id } });
    res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single dish
exports.getDish = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const dish = await Dish.findOne({
      where: { id: req.params.dishId, restaurantId: req.params.id }
    });
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json(dish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a dish
exports.updateDish = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const dish = await Dish.findOne({
      where: { id: req.params.dishId, restaurantId: req.params.id }
    });
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    const { name, description, price } = req.body;
    await dish.update({ name, description, price });
    res.status(200).json(dish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a dish
exports.deleteDish = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const dish = await Dish.findOne({
      where: { id: req.params.dishId, restaurantId: req.params.id }
    });
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    await dish.destroy();
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const orders = await Order.findAll({ where: { restaurantId: req.params.id } });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific order
exports.getOrder = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const order = await Order.findOne({
      where: { id: req.params.orderId, restaurantId: req.params.id }
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an order (e.g., change order status)
exports.updateOrder = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const order = await Order.findOne({
      where: { id: req.params.orderId, restaurantId: req.params.id }
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    await order.update({ status });
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete the entire menu (delete all dishes for this restaurant)
exports.deleteMenu = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    await Dish.destroy({ where: { restaurantId: req.params.id } });
    res.status(200).json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
