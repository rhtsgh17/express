const ArtikelModel = require("../models").evaluasi;
const MateriModel = require("../models").materi;
const { Op } = require("sequelize");

async function createEvaluasi(req, res) {
  try {
    const payload = req.body;

    const { name, email, password, role } = payload;

    await ArtikelModel.create({
      name,
      email,
      password,
      role,
      userId : req.id
    });

    res.status(201).json({
      status: "Success",
      msg: "Berhasil",
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "Fail",
      msg: "Ada Kesalahan",
    });
  }
  };

  async function createMulti(req, res) {
    try {
      const { data } = req.body;
      let success = 0;
      let fail = 0;
      let total = data.length;
      console.log(req.role);
      console.log(req.id);
      if (req.role === "guru") {
        await Promise.all(
          data.map(async (item) => {
            try {
              await MateriModel.create(
                {
                  mataPelajaran: item.mataPelajaran,
                 
                  kelas: item.kelas,
                  mater: item.materi,
                  userId: req.id,
                },
                {
                  where: {
                    userId: req.id,
                  },
                }
              );
              success = success + 1;
            } catch (error) {
              fail = fail + 1;
            }
          })
        );
      } else {
        return res.status(422).json({
          status: "Fail",
          message: "Anda tidak memiliki akses karena role anda adalah siswa",
        });
      }
      res.status(201).json({
        status: "Success",
        message: `succes ${success}, gagal ${fail}. jumlah ${total}`,
        // data: data,
      });
    } catch (error) {
      console.log(error);
      res.status(403).json({
        status: "Fail",
        message: "There is something wrong",
      });
    }
  };

  async function updateMateri(req, res) {
    try {
      // const { id } = req.params;
      const payload = req.body;
      const { mataPelajaran, materi, kelas, id } = payload;
      const artikel = await MateriModel.findByPk(id);
      if (artikel === null) {
        return res.status(404).json({
          status: "Fail",
          message: "Anda tidak 'mengupdate materi ini karena materi ini ditulis oleh guru lain",
        });
      }
      if (artikel.userId != req.id) {
        return res.status(422).json({
          status: "Fail",
          message: "Anda tidak memiliki akses karena role anda adalah siswa",
        });
      }
      await MateriModel.update(
        {
          id,
          mataPelajaran,
          materi,
          kelas,
        },
        {
          where: {
            userId: req.id,
            id: id,
          },
        }
      );
      res.json({
        status: "Success",
        message: "Updated Artikel Berhasil",
        id: id,
      });
    } catch (error) {
      console.log(error);
      res.status(403).json({
        status: "Fail",
        message: "There is something wrong",
      });
    }
  };

  async function deleteMateriMulti(req, res) {
    try {
      const { payload } = req.body;
      let jumlah = payload.length;
      let success = 0;
      let fail = 0;
  
      if (req.role === 'guru') {
        await Promise.all(
          payload.map(async (items, index) => {
            try {
              const materi = await MateriModel.findOne({
                where: { id: items.id },
              });
              if (materi.userId !== req.id) {
                return (fail = fail + 1);
              }
              await MateriModel.destroy({
                where: { id: items.id },
              });
              success = success + 1;
            } catch (error) {
              fail = fail + 1;
            }
          })
        );
        res.status(200).json({
          status: 'Success',
          msg: `Berhasil mendelete ${success} dari ${jumlah} dan gagal mendelete ${fail}`,
        });
      } else {
        res.status(403).json({
          status: 'error',
          msg: 'Anda tidak memiliki akses karena role anda adalah siswa',
        });
      }
    } catch (error) {
      console.log(error);
      res.status(403).json({
        status: 'Fail',
        msg: 'Something went wrong',
      });
    }
  };

  // async function listMateri(req, res) {
  //   try {
  //     let { payload } = req.body;
  //     let success = 0;
  //     let fail = 0;
  //     let jumlah = payload.length;
  
  //     if (req.role === 'Guru') {
  //       await Promise.all(
  //         payload.map(async (item, index) => {
  //           try {
  //             await MateriModel.create({
  //               mataPelajaran: item.mataPelajaran,
  //               kelas: item.kelas,
  //               mater: item.materi,
  //               userId: req.id,
  //             });
  
  //             success = success + 1;
  //           } catch (err) {
  //             fail = fail + 1;
  //           }
  //         })
  //       );
  
  //       res.status(201).json({
  //         status: '201',
  //         msg: `sukses menambahkan ${success} Materi dari total ${jumlah} Materi dan gagal ${fail} Materi`,
  //       });
  //     } else {
  //       res.status(403).json({
  //         status: 'error',
  //         msg: 'Anda tidak memiliki akses karena role anda adalah siswa',
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     res.status(403).json({
  //       status: 'error',
  //       msg: 'error creating',
  //     });
  //   };
  // };

  async function getMateriSiswa(req, res) {
    try {
      let {
        keyword,
        page,
        pageSize,
        offset,
        sortBy = 'id',
        orderBy = 'ASC',
      } = req.query;
  
      const mater = await MateriModel.findAndCountAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        where: {
          [Op.or]: [
            {
              mataPelajaran: {
                [Op.substring]: keyword,
              },
            },
            {
              kelas: {
                [Op.substring]: keyword,
              },
            },
            {
              mater: {
                [Op.substring]: keyword,
              },
            },
          ],
        },
  
        limit: pageSize,
        offset: offset,
        order: [[sortBy, orderBy]],
      });
  
      res.json({
        status: 'success',
        msg: 'Materi was successfully',
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalData: mater.count,
        },
        data: mater.rows,
      });
    } catch (err) {
      console.log(err)
      res.status(403).json({
        status: '404 Not Found',
        msg: 'Ada Kesalahan',
        err
      });
    }
  }

  async function getMateriGuru(req, res) {
    try {
      let {
        materiMilik,
        page,
        pageSize,
        offset,
        sortBy = 'id',
        orderBy = 'ASC',
      } = req.query;
  
      if (materiMilik == 'saya') {
        const mater = await MateriModel.findAndCountAll({
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          where: {
            [Op.or]: [
              {
                userId: req.id,
              },
            ],
          },
  
          limit: pageSize,
          offset: offset,
          order: [[sortBy, orderBy]],
        });
  
        res.json({
          status: 200,
          msg: 'Materi was successfully',
          pagination: {
            currentPage: page,
            pageSize: pageSize,
            totalData: mater.count,
          },
          data: mater.rows,
        });
      } else {
        const mater = await MateriModel.findAndCountAll();
  
        res.json({
          status: 200,
          msg: 'Materi was successfully',
          pagination: {
            currentPage: page,
            pageSize: pageSize,
            totalData: mater.count,
          },
          data: mater.rows,
        });
      }
    } catch (err) {
      res.status(403).json({
        status: '404 Not Found',
        msg: 'Ada Kesalahan',
        err
      });
    }
  }
  

module.exports = {
  createEvaluasi,
  createMulti,
  updateMateri,
  deleteMateriMulti,
  // listMateri,
  getMateriSiswa,
  getMateriGuru
};
