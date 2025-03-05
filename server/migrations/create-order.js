'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            restaurant_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            order_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            order_status: {
                type: Sequelize.ENUM(
                    'New',
                    'Order Received',
                    'Preparing',
                    'On the Way',
                    'Pick-up Ready',
                    'Delivered',
                    'Picked Up',
                    'Cancelled'
                ),
                allowNull: false,
                defaultValue: 'New',
            },
            total_amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Orders');
    }
};