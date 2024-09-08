const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product');

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
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente',  // Estado inicial del pedido
  },
}, {
  timestamps: true,
});

Order.belongsTo(Product, { foreignKey: 'product_id' });  // Relación de uno a muchos

module.exports = Order;
