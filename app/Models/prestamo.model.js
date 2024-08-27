module.exports = (sequelize, Sequelize) => {
  const Prestamo = sequelize.define("prestamo", {
    num_pedido: {
      type: Sequelize.INTEGER,
      autoIncrement: true,  
      primaryKey: true,
    },
    libro_id: {
      type: Sequelize.INTEGER,
    },
    usuario_id: {
      type: Sequelize.INTEGER,
    },
    fecha_salida: {
      type: Sequelize.DATE,
    },
    fecha_maxima: {
      type: Sequelize.DATE,
    },
    fecha_devolucion: {
      type: Sequelize.DATE,
    },
  });

  return Prestamo;
};
