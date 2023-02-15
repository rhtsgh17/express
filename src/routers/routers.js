const express = require("express");
const routers = express.Router();

const { createEvaluasi, createMulti, updateMateri, deleteMateriMulti, listMateri } = require("../controllers/materiControllers");
const {
  register,
  // login,
  loginAuth,

} = require("../controllers/Authcontroller");
const { JsonWebTokenError } = require("jsonwebtoken");
const { jwtValidateMiddleware } = require("../middleware/jwtValidateMiddleware");

routers.post("/register", register);
routers.post("/login", loginAuth);

routers.use(jwtValidateMiddleware)
routers.post("/artikel/create", createEvaluasi);
routers.post("/materi/multi", createMulti);
routers.put("/materi/update", updateMateri);
routers.delete("/materi/deleteMateri/multi", deleteMateriMulti)
routers.post('/materi/list', listMateri);
module.exports = routers;
