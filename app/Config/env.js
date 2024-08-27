const env = {
  database: 'antigua_umg_progra_2024',
  username: 'antigua_umg_progra_2024_user',
  password: 'rvNd3DkVyPZk5PMJaOsYuuEqVB6bviYW',
  host: 'dpg-cr6jsitds78s73buu7ag-a.oregon-postgres.render.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;