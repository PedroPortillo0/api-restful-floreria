const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  nombreproducto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descrip: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: false,  // Desactiva los timestamps automáticos de Sequelize
  tableName: 'products',  // Nombre de la tabla en la base de datos
  createdAt: 'created_at',  // Asocia Sequelize a tu columna `created_at`
  updatedAt: 'updated_at'   // Asocia Sequelize a tu columna `updated_at`
});

module.exports = Product;
