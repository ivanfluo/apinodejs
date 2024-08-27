const db = require('../Config/db.config.js');
const Prestamo = db.Prestamo;

exports.create = (req, res) => {
  let prestamo = {};

  try {
    prestamo.libro_id = req.body.libro_id;
    prestamo.usuario_id = req.body.usuario_id;
    prestamo.fecha_salida = req.body.fecha_salida;
    prestamo.fecha_maxima = req.body.fecha_maxima;
    prestamo.fecha_devolucion = req.body.fecha_devolucion;

    Prestamo.create(prestamo).then((result) => {
      res.status(200).json({
        message: `Registro creado exitosamente con id = ${result.num_pedido}`,
        prestamo: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllPrestamo = (req, res) => {
  Prestamo.findAll()
    .then(prestamoInfo => {
      res.status(200).json({
        message: "Prestamos recuperados exitosamente!",
        prestamos: prestamoInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener prestamos!",
        error: error.message
      });
    });
};

exports.getPrestamoById = (req, res) => {
  let prestamoId = req.params.num_pedido;
  Prestamo.findByPk(prestamoId)
    .then(prestamo => {
      if (prestamo) {
        res.status(200).json({
          message: `Prestamo obtenido con id = ${prestamoId}`,
          prestamo: prestamo
        });
      } else {
        res.status(404).json({
          message: `No se encontró el prestamo con id = ${prestamoId}`
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el prestamo",
        error: error.message
      });
    });
};

exports.updateById = async (req, res) => {
  try {
    let prestamoId = req.params.num_pedido;
    let prestamo = await Prestamo.findByPk(prestamoId);

    if (!prestamo) {
      res.status(404).json({
        message: `No fue posible actualizar la canción con id = ${prestamoId}`,
        prestamo: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        libro_id: req.body.libro_id,
        usuario_id: req.body.usuario_id,
        fecha_salida: req.body.fecha_salida,
        fecha_maxima: req.body.fecha_maxima,
        fecha_devolucion: req.body.fecha_devolucion
      };
      let result = await Prestamo.update(updatedObject, { returning: true, where: { num_pedido: prestamoId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el prestamo con id = " + req.params.id,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: `Prestamo actualizado con éxito, id = ${prestamoId}`,
        prestamo: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar el prestamo con id = " + req.params.num_pedido,
      error: error.message
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let prestamoId = req.params.num_pedido;
    let prestamo = await Prestamo.findByPk(prestamoId);

    if (!prestamo) {
      res.status(404).json({
        message: `No existe la canción con id = ${prestamoId}`,
        error: "404"
      });
    } else {
      await prestamo.destroy();
      res.status(200).json({
        message: `Canción eliminada con éxito, id = ${prestamoId}`,
        prestamo: prestamo
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar una canción con id = " + req.params.num_pedido,
      error: error.message
    });
  }
};                  