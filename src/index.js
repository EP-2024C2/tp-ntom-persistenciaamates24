const {genericMiddleware} = require('./middlewares')
const {sequelize} = require('./models');
const express = require('express')
const routes  = require('./routes/index')
const {initialElementData} = require("./seeders/initialElement");


const app = express()

app.use(express.json())

app.use(genericMiddleware.requestTime)
app.use(routes)


const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
      initialElementData();
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      //sequelize.sync({force:true}) 
      console.log("Base de datos sincronizada");
    });
  }).catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });
