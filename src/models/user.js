'use strict';
const {
  Model
} = require('sequelize');
const nilai2 = require('./nilai2');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.identitas, {
        as: "identitas",
        foreignKey: "userId"
      });
    user.hasMany(models.nilai2, {
      as: "nilai2",
      foreignKey: "userId"
    })
    }
  }
  user.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isEmailVerified: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    tempatLahir: DataTypes.STRING,
    tanggalLahir: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};