'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Carts = sequelize.define('Carts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Carts;
};
