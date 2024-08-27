const express = require("express");
const app = express();
const port = 3030;


const db = require("./app/Config/db.config.js");

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Sincronización de la base de datos completa.");
  })
  .catch(err => {
    console.error("Error al sincronizar la base de datos:", err.message);
  });


app.use(express.json());


const router = require("./app/Routers/router.js");
app.use("/api", router);


app.get("/", (req, res) => {
  res.send("PARCIAL PROGRA 2 TEST");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal.");
});

app.listen(port, () => {
  console.log(`API POR EL PUERTO ${port}`);
});