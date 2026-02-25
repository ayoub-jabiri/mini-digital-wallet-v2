const express = require("express");

const { getPortfolios } = require("../controllers/portfolios.controller");

const portfoliosRouter = express.Router();

portfoliosRouter.get("/", getPortfolios);

module.exports = portfoliosRouter;
