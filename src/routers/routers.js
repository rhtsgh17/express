const express = require("express");
const routers = express.Router();
const {
  getListUser,
  createUser,
  getDetailUserById,
  getDetailUserByParams,
  updateUser,
  deleteUser,
} = require("../controllers/UserControllers");
const {
  getListProduk,
  createProduk,
  getDetailProdukById,
  getDetailProdukByParams,
} = require("../controllers/produkControllers");
const validationResultMiddleware = require("../middleware/validatorResultMiddleware");
const userValidator = require("../validators/userValidator");
const produkValidator = require("../validators/produkValidator");
const {
  register,
  login,
  lupaPassword,
  resetPassword,
} = require("../controllers/Authcontroller");
const {
  jwtValidateMiddleware,
} = require("../middleware/jwtValidateMiddleware");

const {
  createArtikel,
  getArtikel,
  updateArtikel,
  deleteArtikel,
  updatePasswordUser,
  createArtikelBulk,
  createArtikelMulti,
  deleteMulti,
} = require("../controllers/artikelControllers");
const { getListNilai } = require("../controllers/nilaiController");

routers.post("/register", register);
routers.post("/login", login);
routers.post("/lupa-password", lupaPassword);
routers.post("/reset-password/:userId/:token", resetPassword);

routers.use(jwtValidateMiddleware);
routers.get("/user/list", getListUser);
routers.get("/produk/list", getListProduk);
routers.put("/user/update/:id", updateUser);
routers.delete("/user/delete/:id", deleteUser);
routers.post(
  "/user/create",
  userValidator.createUserValidator,
  validationResultMiddleware,
  createUser
);

routers.post("/artikel/create", createArtikel);
routers.get("/artikel", getArtikel);
routers.post("/artikel/updateArtikel/:id", updateArtikel);
routers.delete("/artikel/deleteArtikel/:id", deleteArtikel);
routers.post("/artikel/create/bulk", createArtikelBulk);
routers.post("/artikel/create/multi", createArtikelMulti);
routers.delete("/artikel/delete", deleteMulti);
routers.put("/updatePasword", updatePasswordUser);

routers.put(
  "/user/update/:id",
  userValidator.createUpdateValidator,
  validationResultMiddleware,
  updateUser
);

routers.get("/user/detail/:id", getDetailUserById);
routers.get("/user/list/:email", getDetailUserByParams);

// nilai

routers.get('/nilai/list', getListNilai)

routers.post(
  "/produk/create",
  produkValidator.createProdukValidator,
  validationResultMiddleware,
  createProduk
);

routers.get("/produk/detail/:id", getDetailProdukById);
routers.get("/produk/list/:email", getDetailProdukByParams);
module.exports = routers;
