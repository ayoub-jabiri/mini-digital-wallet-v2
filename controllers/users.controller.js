const fs = require("node:fs");

const users = JSON.parse(fs.readFileSync("./models/users.model.json", "utf-8"));

const controllers = {
    getUsers(req, res) {
        res.json(users);
    },
    getSingleUser(req, res) {
        // Search for the user
        const user = users.filter((us) => us.id == req.params.id);

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
        users.push(newUser);

        updateUsersModel();

        res.status(201).json(newUser);
    },
    updateUser(req, res) {
        const data = req.body;

        // Check if the user exists
        const userIndex = users.findIndex((us) => us.id == req.params.id);

        if (userIndex != -1) {
            // Validate if the all the required data was given
            if (data.name && data.email && data.phone) {
                // Update the user info
                users[userIndex].name = data.name;
                users[userIndex].email = data.email;
                users[userIndex].phone = data.phone;

                updateUsersModel();

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
        const userIndex = users.findIndex((us) => us.id == req.params.id);

        if (userIndex != -1) {
            users.splice(userIndex, 1);

            updateUsersModel();

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

const updateUsersModel = () => {
    fs.writeFileSync("./models/users.model.json", JSON.stringify(users));
};

module.exports = controllers;
