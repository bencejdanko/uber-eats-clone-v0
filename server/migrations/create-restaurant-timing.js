'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('RestaurantTimings', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            restaurant_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            day_of_week: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            open_time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            close_time: {
                type: Sequelize.TIME,
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('RestaurantTimings');
    }
};