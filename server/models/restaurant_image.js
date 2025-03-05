'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const RestaurantImages = sequelize.define('RestaurantImages', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  return RestaurantImages;
};