const { check } = require("express-validator");
const UserModel = require("../models").user;
const createUserValidator = [
  check("nama")
    .isLength({
      min: 1,
    })
    .withMessage("Nama Wajib di isi"),

  check("email")
    .isEmail()
    .withMessage("gunakan Format Email")
    .custom((value) => {
      return UserModel.findOne({
        where: {
          email: value,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
];

const createUpdateValidator = [
  check("nama")
    .isLength({
      min: 1,
    })
    .withMessage("Nama Wajib di isi"),
];


module.exports = { createUserValidator, createUpdateValidator };