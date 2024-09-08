const express = require('express');
const catalogRoutes = require('./routes/catalogRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
app.use(express.json());

// Rutas
app.use('/api', catalogRoutes);
app.use('/api', orderRoutes);

// Sincronizar la base de datos y escuchar en un puerto
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
}).catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
});
