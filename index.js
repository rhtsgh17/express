// const http = require("http");
// const dayjs = require("dayjs");
const express = require("express");
const app = express();

const routers = require("./src/routers/routers");
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

const paginationMiddleware = require("./src/middleware/paginationmiddleware");



// app.use(authMiddleware);
app.use(express.json());
app.use(express.static("./src/storage/upload"));


app.use(paginationMiddleware)   
app.use(routers);
// app.use(routers2);

app.use(bodyParser.json());
// const { smk, cekBilangan } = require("./example");

// const port2 = 8080;
// const hostName = "127.0.0.1";

// app.use(routers);

// app.listen(port, function () {
//   return console.log(`Server ini berjalan di port ${port2}`);
// });

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plan");
//   res.write("tes nodemon doang ");
//   res.write(cekBilangan(17));
//   res.end();
// });

// app.post("/user", (req, res) => {
//   res.send({
//     status: "Pelajar",
//     message: "ini request dengan method Post",
//   });
// });
// app.put("/user", (req, res) => {
//   res.send({
//     status: "Pelajar",
//     message: "ini request dengan method Put",
//   });
// });
// app.patch("/user", (req, res) => {
//   res.send({
//     status: "Pelajar",
//     message: "ini request dengan method Patch",
//   });
// });
// app.delete("/user", (req, res) => {
//   res.send({
//     status: "Pelajar",
//     message: "ini request dengan method Delete",
//   });
// });
// // server.listen(port, hostName, () => {
// //     console.log("Server berjalan di http://localhost:8087")
// // })

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server berjalan di http://localhost:${port}`);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
