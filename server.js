const express = require("express");

const app = express();

const usersRoutes = require("./routes/usersRoutes"),
    portfoliosRoutes = require("./routes/portfoliosRoutes");

app.listen(3000, () => {
    console.log("The server is listening on port 3000");
});
