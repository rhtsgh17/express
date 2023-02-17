// const http = require("http");
// const dayjs = require("dayjs");
const express = require("express");


// const routers = require("./src/routers/routers2");
// const authMiddleware = require("./src/middleware/authmiddleware")
const notFound = require("./src/middleware/404");
// const errorHanding = require("./src/middleware/errorHanding");
const bodyParser = require("body-parser");
const e = require("express");
require("dotenv").config();
const { sequelize } = require("./src/models");
const port = process.env.PORT || 8082;
const authMiddleware = require("./src/middleware/authmiddleware");
const pagintaionMiddleware = require("./src/middleware/paginationMiddleware");
const routes = require("./src/routers/routers.js");

const app = express();
app.use(express.json());
app.use(express.static("./src/storage/upload"));

app.use(routes)
app.use(pagintaionMiddleware)
app.use(bodyParser.json());
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server berjalan di http://localhost:${port}`);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
