const express = require("express");
const config = require("./appConfig/config");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

//BodyParser
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//CONNECT DB
config.mongoconnect();

//DEFINE ROUTES
app.use("/api/user", require("./routes/user"));
app.use("/api/merchant", require("./routes/merchant"));
app.use("/api/services", require("./routes/merchant"));

//START SERVER
const PORT = process.env.PORT || config.port;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
