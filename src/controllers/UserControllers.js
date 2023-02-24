const UserModel = require("../models").user;
const models = require("../models");
const {Op} = require("sequelize")
// const {checkQuery} = require('../utils')
async function getListUser(req, res) {
  try {
    const users = await UserModel.findAll({
      include: [
        {
          model: models.identitas,
          require: true,
          as: "identitas",
          attributes : ["golonganDarah", "alamat"]
        },
        {
          model: models.nilai2,
          require: true,
          as: "nilai2",
          attributes : ["mapel", "nilai"],
          // where: {
          //   ...Op(checkQuery(mapel) && {
          //     mapel: {
          //       [Op.substring]: mapel,
          //     }
          //   })
          // }
        },
      ],
    });
    res.json({
      status: "Success",
      msg: "Data User Di temukan",
      data: users,
    });
  } catch (err) {
    res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}

// create data ke database

async function createUser(req, res) {
  try {
    const payload = req.body;
    let { nama, email, tempatLahir, tanggalLahir } = payload;
    await UserModel.create({
      nama: nama,
      email: email,
      isActive: true,
      tempatLahir: tanggalLahir,
      tanggalLahir: tanggalLahir,
    });
    res.status(201).json({
      status: "success",
      msg: "Berhasil Tersimpan",
    });
  } catch (err) {
    res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
    });
  }
}

async function getDetailUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne(
      {
        include: [
          {
            model: models.identitas,
            require: true,
            as: "identitas",
            attributes : ["golonganDarah", "alamat"]
          },
          
        ],
      }
    );

    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: "User Tidak Ditemukan",
      });
    }

    res.json({
      status: "Sucess",
      msg: "User Berhasil",
      data: user,
    });
  } catch (err) {
    res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
    });
  }
}

async function getDetailUserByParams(req, res) {
  try {
    const { email } = req.params;

    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: "User Tidak Ditemukan",
      });
    }

    res.json({
      status: "Sucess",
      msg: "User Berhasil",
      data: user,
    });
  } catch (err) {
    res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
    });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { nama, tempatLahir, tanggalLahir } = payload;
    const user = await UserModel.findByPk(id);

    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: "User Tidak Ditemukan",
      });
    }
    // await UserModel.update(
    //   {
    //     nama: nama,
    //     tempatLahir: tempatLahir,
    //     tanggalLahir : tanggalLahir,
    //   },
    //   {
    //     where: {
    //       id: id,
    //     },
    //   }
    // );

    await UserModel.update(
      {
        nama,
        tempatLahir,
        tanggalLahir,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({
      status: "Success",
      msg: "Update User Berhasil",
      id: id,
    });
  } catch (err) {
    res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await UserModel.findByPk(id);

    if (user === null) {
      res.status(404).json({
        status: "Fail",
        msg: "User Tidak Ditemukan",
      });
    }
    await UserModel.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      status: "Success",
      msg: "Delete User Berhasil",
    });
  } catch (err) {
    res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}

module.exports = {
  deleteUser,
  getListUser,
  createUser,
  getDetailUserById,
  getDetailUserByParams,
  updateUser,
};
