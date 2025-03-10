'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const FavoriteRestaurant = sequelize.define('FavoriteRestaurant', {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    }, {});
    return FavoriteRestaurant;
};
