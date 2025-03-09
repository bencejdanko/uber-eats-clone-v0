'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('RestaurantTimings', {
            restaurant_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            day_of_week: {
                type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
                primaryKey: true,
                allowNull: false,
            },
            open_time: {
                type: Sequelize.TIME,
                allowNull: true,
            },
            close_time: {
                type: Sequelize.TIME,
                allowNull: true,
            },
            closed: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('RestaurantTimings');
    }
};