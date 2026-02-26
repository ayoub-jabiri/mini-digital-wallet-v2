const fs = require("node:fs");

const wallets = JSON.parse(
        fs.readFileSync("./models/wallets.model.json", "utf-8")
    ),
    users = JSON.parse(fs.readFileSync("./models/users.model.json", "utf-8")),
    history = JSON.parse(
        fs.readFileSync("./models/history.model.json", "utf-8")
    );

const controllers = {
    getWallets(req, res) {
        if (req.query.limit) {
            res.json(wallets.slice(0, req.query.limit));
        } else {
            res.json(wallets);
        }
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

            updateWalletsModel();

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

                updateWalletsModel();

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
    deleteWallet(req, res) {
        // Check if the wallet exists
        const walletIndex = wallets.findIndex((us) => us.id == req.params.id);

        if (walletIndex != -1) {
            wallets.splice(walletIndex, 1);

            updateWalletsModel();

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

                // Save the operation in the history
                history.push({
                    wallet_id: wallets[walletIndex].id,
                    operation_date: new Date().toLocaleString(),
                    operation_type: "Deposit",
                    operation_amount: data.sold,
                });

                updateWalletsModel();
                updateHistoryModel();

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
                // Decrease the wallet sold
                wallets[walletIndex].sold -= data.sold;

                // Save the operation in the history
                history.push({
                    wallet_id: wallets[walletIndex].id,
                    operation_date: new Date().toLocaleString(),
                    operation_type: "Withdraw",
                    operation_amount: data.sold,
                });

                updateWalletsModel();
                updateHistoryModel();

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
};

const updateWalletsModel = () => {
    fs.writeFileSync("./models/wallets.model.json", JSON.stringify(wallets));
};

const updateHistoryModel = () => {
    fs.writeFile("./models/history.model.json", JSON.stringify(history));
};

module.exports = controllers;
