const { getUsers } = require("../controllers/usersController");

const usersRoutes = (req, res) => {
    if (req.url == "/users") {
        getUsers(req, res);
    }
};

module.exports = usersRoutes;
