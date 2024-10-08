'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Componente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Componente.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Componente',
  });
  Componente.associate = (models) => {
    Componente.belongsToMany(models.Producto, {
      through: models.Producto_Componente,
      foreignKey: 'ComponenteId',
      otherKey: 'ProductoId'
    });
  };  
  return Componente;
};