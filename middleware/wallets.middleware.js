const fs = require("node:fs");

const wallets = JSON.parse(
    fs.readFileSync("./models/wallets.model.json", "utf-8")
);

const checkAmount = (req, res, next) => {
    const currentWallet = wallets.find((wallet) => wallet.id == req.params.id);

    if (currentWallet && currentWallet.sold - req.body.sold < 0) {
        return res.status(400).json({
            message: `The operation cannot be completed due to no there is no sufficent sold to be decreased`,
        });
    }

    next();
};

module.exports = { checkAmount };
