const express = require("express");

const {
    getWallets,
    getSingleWallet,
    addWallets,
    updateWallet,
    deletWallet,
    deposit,
    withdraw,
} = require("../controllers/wallets.controller");

const { checkAmount } = require("../middleware/wallets.middleware");

const walletsRouter = express.Router();

walletsRouter.get("/", getWallets);
walletsRouter.get("/:id", getSingleWallet);
walletsRouter.post("/", addWallets);
walletsRouter.put("/:id", updateWallet);
walletsRouter.delete("/:id", deletWallet);
walletsRouter.put("/:id/deposit", deposit);
walletsRouter.put("/:id/withdraw", checkAmount, withdraw);

module.exports = walletsRouter;
