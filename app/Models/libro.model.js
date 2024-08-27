module.exports = (sequelize, Sequelize) => {
  const Libro = sequelize.define("libro", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreLibro: {
      type: Sequelize.STRING,
    },
    editorial: {
      type: Sequelize.STRING,
    },
    autor: {
      type: Sequelize.STRING,
    },
    genero: {
      type: Sequelize.STRING,
    },
    paisAutor: {
      type: Sequelize.STRING,
    },
    numPaginas: {
      type: Sequelize.INTEGER,
    },
    anioEdicion: {
      type: Sequelize.DATE,
    },
    precioLibro: {
      type: Sequelize.FLOAT,
    },
  });

  return Libro;
};
