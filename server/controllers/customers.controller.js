const { Customer, Order, Cart, CartItem, Favorite } = require('../models');
const bcrypt = require('bcryptjs');

// Create a new customer (signup)
exports.createCustomer = async (req, res) => {
  try {
    const { name, email, password, profile_picture, country, state } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    const customer = await Customer.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      profile_picture,
      country,
      state,
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSession = async (req, res) => {

  console.log("Requesting session..." + req.session.customerId);
  console.log(JSON.stringify(req.session));

  if (req.session.customerId) {
    const customer = await Customer.findByPk(req.session.customerId);
    res.json(customer);
  }
  else {
    res.status(401).json({ message: 'Unauthorized. Please login.' });
  }
}

// Login customer
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const customer = await Customer.findOne({ where: { email } });
    if (!customer)
      return res.status(404).json({ message: 'Customer not found' });

    const isMatch = bcrypt.compareSync(password, customer.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Save customer id in session
    req.session.customerId = customer.id;
    console.log("Logged in as " + req.session.customerId);
    console.log(JSON.stringify(req.session));

    res.json({ message: 'Logged in successfully', customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout customer
exports.logoutCustomer = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) return res.status(500).json({ message: 'Error logging out' });
      res.json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get customer by ID (requires session auth)
exports.getCustomerById = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update customer details (PATCH)
exports.updateCustomer = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const { name, email, password, country, state } = req.body;
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    if (name) customer.name = name;
    if (email) customer.email = email;
    if (password) customer.password = bcrypt.hashSync(password, 10);
    if (country) customer.country = country;
    if (state) customer.state = state;

    await customer.save();
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update customer's profile picture (PUT)
exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const { profile_picture } = req.body;
    if (!profile_picture)
      return res.status(400).json({ message: 'Profile picture is required' });

    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    customer.profile_picture = profile_picture;
    await customer.save();
    res.json({ message: 'Profile picture updated', profile_picture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get customer's orders
exports.getCustomerOrders = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const orders = await Order.findAll({ where: { customerId: req.params.id } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get customer's cart items
exports.getCustomerCart = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const cart = await Cart.findOne({ where: { customerId: req.params.id } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const items = await CartItem.findAll({ where: { cartId: cart.id } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear customer's cart (DELETE)
exports.clearCustomerCart = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const cart = await Cart.findOne({ where: { customerId: req.params.id } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    await CartItem.destroy({ where: { cartId: cart.id } });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add an item to customer's cart (POST)
exports.addItemToCart = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const { productId, quantity } = req.body;
    if (!productId || !quantity)
      return res.status(400).json({ message: 'Product ID and quantity are required' });

    let cart = await Cart.findOne({ where: { customerId: req.params.id } });
    if (!cart) {
      cart = await Cart.create({ customerId: req.params.id });
    }

    const cartItem = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an item in the cart (PATCH)
exports.updateCartItem = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const { itemId } = req.params;
    const { quantity } = req.body;
    if (!quantity)
      return res.status(400).json({ message: 'Quantity is required' });

    const cartItem = await CartItem.findOne({ where: { id: itemId } });
    if (!cartItem)
      return res.status(404).json({ message: 'Cart item not found' });

    // Ensure the cart item belongs to the authenticated customer
    const cart = await Cart.findOne({
      where: { id: cartItem.cartId, customerId: req.params.id },
    });
    if (!cart)
      return res.status(403).json({ message: 'This cart item does not belong to you' });

    cartItem.quantity = quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an item from the cart (DELETE)
exports.deleteCartItem = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const { itemId } = req.params;
    const cartItem = await CartItem.findOne({ where: { id: itemId } });
    if (!cartItem)
      return res.status(404).json({ message: 'Cart item not found' });

    const cart = await Cart.findOne({
      where: { id: cartItem.cartId, customerId: req.params.id },
    });
    if (!cart)
      return res.status(403).json({ message: 'This cart item does not belong to you' });

    await cartItem.destroy();
    res.json({ message: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a favorite item (POST)
exports.addFavorite = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const { productId } = req.body;
    if (!productId)
      return res.status(400).json({ message: 'Product ID is required' });

    const favorite = await Favorite.create({
      customerId: req.params.id,
      productId,
    });
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get customer's favorite items (GET)
exports.getFavorites = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const favorites = await Favorite.findAll({ where: { customerId: req.params.id } });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a favorite item (DELETE)
exports.deleteFavorite = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const { favoriteId } = req.params;
    const favorite = await Favorite.findOne({
      where: { id: favoriteId, customerId: req.params.id },
    });
    if (!favorite)
      return res.status(404).json({ message: 'Favorite not found' });

    await favorite.destroy();
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
