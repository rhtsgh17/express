const UserModel = require("../models").evaluasi;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmailHandle = require("../mail");
const crypto = require("crypto");
const dayjs = require("dayjs");
require("dotenv").config;

async function register(req, res) {
  try {
    const payload = req.body;
    const { name, email, password, role } = payload;

    let hashPassword = await bcrypt.hashSync(password, 10);

    await UserModel.create({
      name,
      email,
      password : hashPassword,
      role,
    });

    res.json({
      status: "Success",
      msg: "Register Berhasil",
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "gagal",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}

async function loginAuth(req, res) {
  try {
    let payload = req.body;
    let { email, password } = payload;

    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (user === null) {
      return res.status(422).json({
        status: 422,
        msg: 'Email tidak ditemukan silahkan register',
      });
    }
   

    const verify = await bcrypt.compareSync(password, user.password);

    if (!verify) {
      return res.status(422).json({
        status: 422,
        msg: 'Email dan Password tidak dicocok',
      });
    }

    const token = jwt.sign(
      {
        id: user?.id,
        email: user?.email,
        role: user?.role,
        nama: user?.nama,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.json({
      status: 'success',
      msg: 'successfully login',
      token: token,
      user: user,
    });
  } catch (err) {
    res.status(403).json({
      status: 'error',
      msg: 'failed to login',
    });
  }
}

module.exports = {
  register,
  loginAuth,
};
