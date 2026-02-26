const wallets = require("../models/wallets.model"),
    users = require("../models/users.model");

const controllers = {
    getWallets(req, res) {
        res.json(wallets);
    },
    getSingleWallet(req, res) {
        // Search for the wallet
        const wallet = wallets.filter((wa) => wa.id == req.params.id);

        // Check if the wallet exits or not
        if (wallet.length) {
            res.json(wallet);
        } else {
            // Send an error message
            res.status(404).json({
                error: "Wallet not found!",
            });
        }
    },
    addWallets(req, res) {
        const data = req.body;

        // Validate if the all the required data was given
        if (!data.user_id || !data.name) {
            // Send an error message
            return res.status(400).json({
                error: "Missing some required wallet data",
            });
        }

        // Check if the associated user is registered
        const user = users.filter((us) => us.id == data.user_id);

        if (user.length) {
            let newWallet = {
                id: Date.now(),
                user_id: data.user_id,
                name: data.name,
                sold: 0,
            };
            wallets.push(newWallet);

            res.status(201).json(newWallet);
        } else {
            return res.status(404).json({
                error: "The associated user is not registered yet!",
            });
        }
    },
    updateWallet(req, res) {
        const data = req.body;

        // Check if the wallet exists
        const walletIndex = wallets.findIndex((us) => us.id == req.params.id);

        if (walletIndex != -1) {
            // Validate if the the required data was given
            if (data.name) {
                // Update the wallet info
                wallets[walletIndex].name = data.name;

                res.json({
                    message: "The wallet info has been updated successfully!",
                });
            } else {
                res.status(400).json({
                    error: "Missing some required wallet data",
                });
            }
        } else {
            // Send an error message
            res.status(404).json({
                error: "Wallet not found!",
            });
        }
    },
    deletWallet(req, res) {
        // Check if the wallet exists
        const walletIndex = wallets.findIndex((us) => us.id == req.params.id);

        if (walletIndex != -1) {
            wallets.splice(walletIndex, 1);

            res.json({
                message: "The wallet has been deleted successfully!",
            });
        } else {
            // Send an error message
            res.status(404).json({
                error: "Wallet not found!",
            });
        }
    },
    deposit(req, res) {
        const data = req.body;

        // Check if the wallet exists
        const walletIndex = wallets.findIndex((us) => us.id == req.params.id);

        if (walletIndex != -1) {
            // Validate if the the required data was given
            if (data.sold) {
                // Increase the wallet sold
                wallets[walletIndex].sold += data.sold;

                res.json({
                    message: `The operation is completed and the current sold: ${wallets[walletIndex].sold}`,
                });
            } else {
                res.status(400).json({
                    error: "Missing some required data",
                });
            }
        } else {
            // Send an error message
            res.status(404).json({
                error: "Wallet not found!",
            });
        }
    },
    withdraw(req, res) {
        const data = req.body;

        // Check if the wallet exists
        const walletIndex = wallets.findIndex((us) => us.id == req.params.id);

        if (walletIndex != -1) {
            // Validate if the the required data was given
            if (data.sold) {
                // Check if there is sufficent sold to be decreased
                if (wallets[walletIndex].sold - data.sold >= 0) {
                    // Decrease the wallet sold
                    wallets[walletIndex].sold -= data.sold;

                    res.json({
                        message: `The operation is completed and the current sold: ${wallets[walletIndex].sold}`,
                    });
                } else {
                    res.status(400).json({
                        message: `The operation cannot be completed due to no there is no sufficent sold to be decreased`,
                    });
                }
            } else {
                res.status(400).json({
                    error: "Missing some required data",
                });
            }
        } else {
            // Send an error message
            res.status(404).json({
                error: "Wallet not found!",
            });
        }
    },
};

module.exports = controllers;
