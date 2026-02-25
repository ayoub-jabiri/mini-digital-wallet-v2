const express = require("express");

const {
    getUsers,
    getSingleUser,
    addUsers,
    updateUser,
    deletUser,
} = require("../controllers/users.controller");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getSingleUser);
usersRouter.post("/", addUsers);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deletUser);

module.exports = usersRouter;
