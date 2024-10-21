require('dotenv').config({ path: './config/.env' });
const express = require('express');
const app = express();
const { sequelize } = require('../models');
const productoRoutes = require('./routes/productos');
const fabricanteRoutes = require('./routes/fabricantes');
const componenteRoutes = require('./routes/componentes');

app.use(express.json());

// Registro de las rutas de cada recurso
app.use('/productos', productoRoutes);
app.use('/fabricantes', fabricanteRoutes);
app.use('/componentes', componenteRoutes);

// Config del puerto
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.error('No se pudo conectar a la base de datos:', error);
});
