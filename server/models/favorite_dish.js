'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const FavoriteDish = sequelize.define('FavoriteDish', {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        dish_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
    }, {});
    return FavoriteDish;
};
