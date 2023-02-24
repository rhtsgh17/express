const NilaiModel = require("../models").nilai2;
const models = require("../models");
const { Op } = require("sequelize");
const nilai2 = require("../models/nilai2");
// const {checkQuery} = require('../utils')

async function getListNilai(req, res) {
  let { page, pageSize } = req.query;
  try {
    const nilai2 = await NilaiModel.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updateAt"],
      },
      include: [
        {
          model: models.user,
          require: true,
          as: "user",
          attributes: ["nama", "email"],
        },
      ],
    });
    res.json({
      status: "Success",
      msg: "Nilai Di temukan",
      pagination: {
        currentPage: page,
        pageSize: pageSize,
      },
      data: nilai2,
      query: {
        page,
        pageSize,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
      err: err,
    });
  }
}

module.exports = { getListNilai };
