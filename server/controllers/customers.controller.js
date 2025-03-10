const session = require('express-session');
const { Customer, Order, OrderItem, Cart, CartItem, FavoriteRestaurant, FavoriteDish, Dish } = require('../models');
const bcrypt = require('bcryptjs');
const order = require('../models/order');

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
    req.session.customerId = customer.id;
    customer.password = undefined;

    // Create a cart for the customer
    await Cart.create({ customer_id: customer.id });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSession = async (req, res) => {

  if (req.session.customerId) {
    const customer = await Customer.findByPk(req.session.customerId);
    customer.password = undefined;
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

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout customer
exports.logoutCustomer = async (req, res) => {
  try {
    if (!req.session.restaurantId) {
      req.session.destroy();
    } else {
      req.session.customerId = undefined;
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get customer by ID (requires session auth)
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    customer.password = undefined;
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

    const { name, country, state } = req.body;
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    if (name) customer.name = name;
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
    const orders = await Order.findAll({ where: { customer_id: req.params.id } });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }

    const cart = await Cart.findOne({ where: { customer_id: req.params.id } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const cartItems = await CartItem.findAll({ where: { cart_id: cart.id } });
    if (cartItems.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }

    const order = await Order.create({
      customer_id: req.params.id,
      cart_id: cart.id,
      order_date: new Date(),
      total_amount: total,
    });

    for (const item of cartItems) {

      // fetch the restaurant id from the dish id
      const dish = await Dish.findByPk(item.dish_id);
      const restaurant_id = dish.restaurant_id;

      await OrderItem.create({
        order_id: order.id,
        restaurant_id: restaurant_id,
        customer_id: req.params.id,
        dish_id: item.dish_id,
        quantity: item.quantity,
        price: item.price,
      });
    }

    await CartItem.destroy({ where: { cart_id: cart.id } });
    await cart.destroy();

    res.status(201).json(order);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

exports.getOrderItemsByOrderId = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    
    const orderItems = await OrderItem.findAll({ where: { order_id: req.params.orderId } });
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getOrderItemsByCustomerId = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }

    const orders = await Order.findAll({ where: { customer_id: req.params.id } });
    const orderIds = orders.map(order => order.id);
    const orderItems = await OrderItem.findAll({ where: { order_id: orderIds } });
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get customer's cart items
exports.getCustomerCart = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const cart = await Cart.findOne({ where: { customer_id: req.params.id } });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const items = await CartItem.findAll({ where: { cart_id: cart.id } });
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Clear customer's cart (DELETE)
exports.clearCustomerCart = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const cart = await Cart.findOne({ where: { customer_id: req.params.id } });
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

    const { dish_id, quantity, price } = req.body;
    if (!dish_id || !quantity || !price)
      return res.status(400).json({ message: 'dish_id and quantity are required' });

    // Find or create cart
    let cart = await Cart.findOne({ where: { customer_id: req.params.id } });

    if (!cart) {
      cart = await Cart.create({ customer_id: req.params.id });
    }

    // Check if the dish already exists in the cart
    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, dish_id },
    });

    if (cartItem) {
      // If dish exists, update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Otherwise, create a new cart item
      cartItem = await CartItem.create({
        cart_id: cart.id,
        dish_id,
        price,
        quantity,
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// Update an item in the cart (PATCH)
exports.updateCartItem = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const { quantity } = req.body;
    if (!quantity)
      return res.status(400).json({ message: 'Quantity is required' });

    // Find the cart for the customer
    const cart = await Cart.findOne({ where: { customer_id: req.params.id } });
    if (!cart)
      return res.status(404).json({ message: 'Cart not found' });

    // Find the cart item by dish_id
    const cartItem = await CartItem.findOne({ where: { cart_id: cart.id, id: req.params.itemId } });
    if (!cartItem)
      return res.status(404).json({ message: 'Cart item not found' });

    cartItem.quantity = quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete an item from the cart by dish ID (DELETE)
exports.deleteCartItem = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    // Find the cart for the customer
    const cart = await Cart.findOne({ where: { customer_id: req.params.id } });
    if (!cart)
      return res.status(404).json({ message: 'Cart not found' });

    // Find the cart item by dish_id
    const cartItem = await CartItem.findOne({ where: { cart_id: cart.id, id: req.params.itemId } });
    if (!cartItem)
      return res.status(404).json({ message: 'Cart item not found' });

    await cartItem.destroy();
    res.json({ message: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a favorite item (POST)
exports.addFavoriteRestaurant = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }

    if (!req.params.restaurantId)
      return res.status(400).json({ message: 'restaurantId param is required' });


    // Check if the restaurant is already a favorite
    const existingFavorite = await FavoriteRestaurant.findOne({
      where: { customer_id: req.params.id, restaurant_id: req.params.restaurantId },
    });
    if (existingFavorite)
      return res.status(400).json({ message: 'Restaurant is already a favorite' });


    const favorite = await FavoriteRestaurant.create({
      customer_id: req.params.id,
      restaurant_id: req.params.restaurantId,
    });
    res.status(201).json(favorite);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Add a favorite item (POST)
exports.addFavoriteDish = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }

    if (!req.params.dishId)
      return res.status(400).json({ message: 'dishId param is required' });


    // Check if the dish is already a favorite
    const existingFavorite = await FavoriteDish.findOne({
      where: { customer_id: req.params.id, dish_id: req.params.dishId },
    });
    if (existingFavorite)
      return res.status(400).json({ message: 'Dish is already a favorite' });

    const favorite = await FavoriteDish.create({
      customer_id: req.params.id,
      dish_id: req.params.dishId,
    });
    res.status(201).json(favorite);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};


// Get customer's favorite items (GET)
exports.getFavoriteRestaurants = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const favorites = await FavoriteRestaurant.findAll({ where: { customer_id: req.params.id } });
    res.json(favorites);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

exports.getFavoriteDishes = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const favorites = await FavoriteDish.findAll({ where: { customer_id: req.params.id } });
    res.json(favorites);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

// Remove a favorite item (DELETE)
exports.deleteFavoriteRestaurant = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }


    const favorite = await FavoriteRestaurant.findOne({
      where: { customer_id: req.params.id, restaurant_id: req.params.restaurantId },
    });
    if (!favorite)
      return res.status(404).json({ message: 'Favorite not found' });

    await favorite.destroy();
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

exports.deleteFavoriteDish = async (req, res) => {
  try {
    if (!req.session.customerId || req.session.customerId.toString() !== req.params.id) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }


    const favorite = await FavoriteDish.findOne({
      where: { customer_id: req.params.id, dish_id: req.params.dishId },
    });
    if (!favorite)
      return res.status(404).json({ message: 'Favorite not found' });

    await favorite.destroy();
    res.json({ message: 'Favorite removed' });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
}