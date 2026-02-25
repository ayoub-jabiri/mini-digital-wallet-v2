const model = require("../models/users.model");

const controllers = {
    getUsers(req, res) {
        res.json(model);
    },
    getSingleUser(req, res) {
        // Search for the user
        const user = model.filter((us) => us.id == req.params.id);

        // Check if the user exits or not
        if (user.length) {
            res.json(user);
        } else {
            // Send an error message
            res.status(404).json({
                error: "User not found!",
            });
        }
    },
    addUsers(req, res) {
        const data = req.body;

        // Validate if the all the required data was given
        if (!data.name || !data.email || !data.phone) {
            // Send an error message
            return res.status(400).json({
                error: "Missing some required user data",
            });
        }

        let newUser = {
            id: Date.now(),
            name: data.name,
            email: data.email,
            phone: data.phone,
        };
        model.push(newUser);

        res.status(201).json(newUser);
    },
    updateUser(req, res) {
        const data = req.body;

        // Check if the user exists
        const userIndex = model.findIndex((us) => us.id == req.params.id);

        if (userIndex != -1) {
            // Validate if the all the required data was given
            if (data.name && data.email && data.phone) {
                // Update the user info
                model[userIndex].name = data.name;
                model[userIndex].email = data.email;
                model[userIndex].phone = data.phone;

                res.json({
                    message: "The user info has been updated successfully!",
                });
            } else {
                res.status(400).json({
                    error: "Missing some required user data",
                });
            }
        } else {
            // Send an error message
            res.status(404).json({
                error: "User not found!",
            });
        }
    },
    deletUser(req, res) {
        // Check if the user exists
        const userIndex = model.findIndex((us) => us.id == req.params.id);

        if (userIndex != -1) {
            model.splice(userIndex, 1);

            res.json({
                message: "The user has been deleted successfully!",
            });
        } else {
            // Send an error message
            res.status(404).json({
                error: "User not found!",
            });
        }
    },
};

module.exports = controllers;
