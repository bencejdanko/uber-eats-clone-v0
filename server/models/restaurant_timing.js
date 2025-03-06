'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const RestaurantTiming = sequelize.define('RestaurantTiming', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day_of_week: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    open_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    close_time: {
      type: DataTypes.TIME,
      allowNull: false,
    }
  }, {});
  return RestaurantTiming;
};
