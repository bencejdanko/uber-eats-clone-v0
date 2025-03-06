'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  }, {});
  return Order;
};
