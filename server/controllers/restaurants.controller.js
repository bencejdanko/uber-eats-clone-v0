const session = require('express-session');
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
    // Remove password from response
    restaurant.password = undefined;
    req.session.restaurantId = restaurant.id;
    res.status(201).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSession = async (req, res) => {
  if (req.session.restaurantId) {
    const restaurant = await Restaurant.findByPk(req.session.restaurantId);
    restaurant.password = undefined;
    res.json(restaurant);
  }
  else {
    res.status(401).json({ message: 'Unauthorized. Please login.' });
  }
}

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
    if (!req.session.customerId) {
      console.log("Destroying session")
      req.session.destroy();
    } else {
      console.log("Getting out of session")
      req.session.restaurantId = undefined;
    }
    res.status(200).json({ message: 'Logged out successfully' });
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

// Get paginated restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.body;
    const offset = (page - 1) * limit;
    const restaurants = await Restaurant.findAndCountAll({ offset, limit });
    // remove password field from response
    restaurants.rows.forEach(restaurant => {
      restaurant.password = undefined;
      restaurant.email = undefined;
    });
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update restaurant details
exports.updateRestaurant = async (req, res) => {
  try {
    if (!(req.session.restaurantId == req.params.id)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const restaurant = await Restaurant.findByPk(req.session.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    // Allow updating of basic fields (avoid password changes here)
    const { name, description, location, contact_info } = req.body;
    await restaurant.update({ name, description, location, contact_info });
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.putRestaurantTiming = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { day_of_week, open_time, close_time, closed, restaurant_id } = req.body;
    console.log(JSON.stringify(req.body, null, 2));
    if (!day_of_week || !restaurant_id) {
      return res.status(400).json({ message: 'Day and restaurant ID is required' });
    }

    const [restaurantTiming, created] = await RestaurantTiming.upsert({
      restaurant_id: req.params.id,
      day_of_week,
      open_time: open_time || null,
      close_time: close_time || null,
      closed: closed || false,
    });

    res.status(201).json({ restaurantTiming, created });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get RestaurantTimings
exports.getRestaurantTimings = async (req, res) => {
  try {
    const RestaurantTimings = await RestaurantTiming.findAll({ where: { restaurant_id: req.params.id } });
    res.status(200).json(RestaurantTimings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get RestaurantImages
exports.getRestaurantImages = async (req, res) => {
  try {
    const RestaurantImages = await RestaurantImage.findAll({ where: { restaurant_id: req.params.id } });
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

    const image = await RestaurantImage.findOne({
      where: { id: req.params.imageId }
    });
    if (!image) {
      return res.status(404).json({ message: 'RestaurantImage not found' });
    }
    await image.destroy();
    res.status(200).json({ message: 'RestaurantImage deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new dish
exports.putDish = async (req, res) => {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const dish = await Dish.upsert({
      ...req.body,
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
    const dishes = await Dish.findAll({ where: { restaurant_id: req.params.id } });
    res.status(200).json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single dish
exports.getDish = async (req, res) => {
  try {
    const dish = await Dish.findOne({
      where: { id: req.params.dishId, restaurant_id: req.params.id }
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
