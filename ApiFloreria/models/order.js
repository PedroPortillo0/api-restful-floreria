const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');  // Importar el modelo Product

const Order = sequelize.define('Order', {
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'procesado', 'enviado'),  // Definición del enum
    defaultValue: 'pendiente',  // Estado inicial del pedido
  },
}, {
  timestamps: false,  // Desactiva los timestamps automáticos de Sequelize
  tableName: 'orders',  // Nombre de la tabla en la base de datos
  createdAt: 'created_at',  // Asocia Sequelize a tu columna `created_at`
  updatedAt: 'updated_at'   // Asocia Sequelize a tu columna `updated_at`
});

// Establecer la relación entre Order y Product
Order.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

module.exports = Order;
