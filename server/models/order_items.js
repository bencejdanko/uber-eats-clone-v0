'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dish_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    order_status: {
      type: DataTypes.ENUM(
        'New',
        'Order Received',
        'Preparing',
        'On the Way',
        'Pick-up Ready',
        'Delivered',
        'Picked Up',
        'Cancelled'
      ),
      allowNull: false,
      defaultValue: 'New',
    },
  }, {});
  return OrderItem;
};
