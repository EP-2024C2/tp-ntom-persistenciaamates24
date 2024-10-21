'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Producto.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.FLOAT,
    pathImg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto',
  });
  Producto.associate = (models) => {
    Producto.belongsToMany(models.Fabricante, {
      through: models.Producto_Fabricante,
      foreignKey: 'ProductoId',
      otherKey: 'FabricanteId'
    });
    Producto.belongsToMany(models.Componente, {
      through: models.Producto_Componente,
      foreignKey: 'ProductoId',
      otherKey: 'ComponenteId'
    });
  };  
  return Producto;
};