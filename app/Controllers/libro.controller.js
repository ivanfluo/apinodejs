const db = require('../Config/db.config.js');
const Libro = db.Libro;

exports.create = (req, res) => {
  let libro = {};

  try {
    libro.nombreLibro = req.body.nombreLibro;
    libro.editorial = req.body.editorial;
    libro.autor = req.body.autor;
    libro.genero = req.body.genero;
    libro.paisAutor = req.body.paisAutor;
    libro.numPaginas = req.body.numPaginas;
    libro.anioEdicion = req.body.anioEdicion;
    libro.precioLibro = req.body.precioLibro;

    Libro.create(libro).then((result) => {
      res.status(200).json({
        message: "Registro creado exitosamente con id = ${result.id}",
        libro: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al momento de crear!",
      error: error.message,
    });
  }
};

exports.retrieveAllLibro = (req, res) => {
  Libro.findAll()
    .then(libroInfo => {
      res.status(200).json({
        message: "Libros recuperados exitosamente!",
        libros: libroInfoInfo
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error al obtener libros!",
        error: error.message
      });
    });
};

exports.getLibroById = (req, res) => {
  let libroId = req.params.id;
  Libro.findByPk(libroId)
    .then(libro => {
      if (libro) {
        res.status(200).json({
          message: "Libro obtenido con id = ${libroId}",
          libro: libro
        });
      } else {
        res.status(404).json({
          message: "No se encontró el libro con id = ${libroId}"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "No fue posible obtener el libro",
        error: error.message
      });
    });
};

exports.updateById = async (req, res) => {
  try {
    let libroId = req.params.id;
    let libro = await Libro.findByPk(libroId);

    if (!libro) {
      res.status(404).json({
        message: "No fue posible actualizar el libro con id = ${libroId}",
        libro: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        nombreLibro: req.body.nombreLibro,
        editorial: req.body.editorial,
        autor: req.body.autor,
        genero: req.body.genero,
        paisAutor: req.body.paisAutor,
        numPaginas: req.body.numPaginas,
        anioEdicion: req.body.anioEdicion,
        precioLibro: req.body.precioLibro
      };
      let result = await Libro.update(updatedObject, { returning: true, where: { id: libroId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> No fue posible actualizar el libro con id = " + req.params.id,
          error: "Can NOT Updated"
        });
      }

      res.status(200).json({
        message: "Libro actualizado con éxito, id = ${libroId}",
        cancion: updatedObject
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede actualizar la canción con id = " + req.params.id,
      error: error.message
    });
  }
};

exports.deleteById = async (req, res) => {
  try {
    let libroId = req.params.id;
    let libro = await Libro.findByPk(libroId);

    if (!libro) {
      res.status(404).json({
        message: "No existe el libro con id = ${libroId}",
        error: "404"
      });
    } else {
      await libro.destroy();
      res.status(200).json({
        message: "Libro eliminado con éxito, id = ${libroId}",
        libro: libro
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> No se puede eliminar el libro con id = " + req.params.id,
      error: error.message
    });
  }
};