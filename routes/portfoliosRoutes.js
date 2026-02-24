const { getPortfolios } = require("../controllers/portfolioController");

const portfoliosRoutes = (req, res) => {
    if (req.url == "/portfolios") {
        getPortfolios(req, res);
    }
};

module.exports = portfoliosRoutes;
