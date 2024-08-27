let express = require("express");
let router = express.Router();

const prestamo = require("../Controllers/prestamo.controller.js");

router.post("/prestamo/create", prestamo.create);
router.get("/prestamo/all", prestamo.retrieveAllPrestamo);
router.get("/prestamo/onebyid/:num_pedido", prestamo.getPrestamoById);
router.put("/prestamo/update/:num_pedido", prestamo.updateById);
router.delete("/prestamo/delete/:num_pedido", prestamo.deleteById);

module.exports = router;
