'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const RestaurantTiming = sequelize.define('RestaurantTiming', {
    restaurant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    day_of_week: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    open_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    close_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    closed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  }, {});
  return RestaurantTiming;
};
