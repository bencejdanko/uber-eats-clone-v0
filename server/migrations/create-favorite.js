'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Favorites', {
            customer_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            restaurant_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Favorites');
    }
};