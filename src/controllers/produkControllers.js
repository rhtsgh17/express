const ProdukModel = require("../models").produk

async function getListProduk(req, res) {
  try {
    const produks = await ProdukModel.findAll();
    res.json({
      status: "Success",
      msg: "Data Produk Di temukan",
      data: produks,
    });
  } catch (err) {
    res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
      err: err,
    });
    console.log(err);
  }
}
async function createProduk(req, res) {
  try {
    const payload = req.body;
    let { nama, email, tempatLahir, tanggalLahir } = payload;
    await ProdukModel.create({
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

async function getDetailProdukById(req, res) {
  try {
    const { id } = req.params;

    const produk = await ProdukModel.findByPk(id);

    if (produk === null) {
      res.status(404).json({
        status: "Fail",
        msg: "User Tidak Ditemukan",
      });
    }

    res.json({
      status: "Sucess",
      msg: "User Berhasil",
      data: produk,
    });
  } catch (err) {
    res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
    });
  }
}

async function getDetailProdukByParams(req, res) {
  try {
    const { email } = req.params;

    const produk = await ProdukModel.findOne({
        where : {
          email : email
        }
    });

    if (produk === null) {
      res.status(404).json({
        status: "Fail",
        msg: "User Tidak Ditemukan",
      });
    }

    res.json({
      status: "Sucess",
      msg: "User Berhasil",
      data: produk,
    });
  } catch (err) {
    res.status(403).json({
      status: "fail",
      msg: "Ada Kesalahan",
    });
  }
}

module.exports = { getListProduk, createProduk, getDetailProdukById, getDetailProdukByParams };