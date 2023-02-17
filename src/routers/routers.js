const express = require("express");
const routes = express.Router();
const {
  createEvaluasi,
  createMulti,
  updateMateri,
  deleteMateriMulti,
  getMateriSiswa,
  getMateriGuru,
} = require("../controllers/materiControllers");
const { register, loginAuth } = require("../controllers/Authcontroller");
const { JsonWebTokenError } = require("jsonwebtoken");
const {
  jwtValidateMiddleware,
} = require("../middleware/jwtValidateMiddleware");

routes.post("/register", register);
routes.post("/login", loginAuth);

routes.use(jwtValidateMiddleware);
routes.post("/artikel/create", createEvaluasi);
routes.post("/materi/multi", createMulti);
routes.put("/materi/update", updateMateri);
routes.delete("/materi/deleteMateri/multi", deleteMateriMulti);
// routers.post('/materi/list', listMateri);
routes.get("/materi/list/siswa", getMateriSiswa);
routes.get("/materi/list/guru", getMateriGuru);
module.exports = routes;
