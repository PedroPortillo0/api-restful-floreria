const express = require('express');
const catalogRoutes = require('./routes/catalogRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
app.use(express.json());

// Sincronizar la base de datos para ajustar las tablas a los modelos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelos sincronizados con la base de datos');
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });

// Rutas
app.use('/api', catalogRoutes);  // Rutas de catálogo (productos)
app.use('/api', orderRoutes);    // Rutas de órdenes

// Iniciar el servidor y escuchar en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

