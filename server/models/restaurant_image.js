'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const RestaurantImage = sequelize.define('RestaurantImage', {
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
  return RestaurantImage;
};