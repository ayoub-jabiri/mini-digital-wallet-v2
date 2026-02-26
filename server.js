const express = require("express");

const app = express();

const usersRouter = require("./routes/users.router");
const walletsRouter = require("./routes/wallets.router");

app.use(express.json());

app.use("/users", usersRouter);
app.use("/wallets", walletsRouter);

app.listen(3000, () => {
    console.log("The server is listening on port 3000");
});
