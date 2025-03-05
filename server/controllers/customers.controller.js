const { Customer } = require('../models');
const bcrypt = require('bcrypt');

exports.createCustomer = async (req, res) => {
    try {
        const { name, email, password, profile_picture, country, state } = req.body;
        const customer = await Customer.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            profile_picture,
            country,
            state
        });
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}