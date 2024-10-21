'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fabricante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fabricante.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    numeroContacto: DataTypes.STRING,
    pathImgPerfil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fabricante',
  });
  Fabricante.associate = (models) => {
    Fabricante.belongsToMany(models.Producto, {
      through: models.Producto_Fabricante,
      foreignKey: 'FabricanteId',
      otherKey: 'ProductoId'
    });
  };  
  return Fabricante;
};