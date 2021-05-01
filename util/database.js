
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-learn', 'root', 'Cherish-123', {
   dialect: 'mysql', 
   host: 'localhost'
})

module.exports = sequelize;

/* const mysql = require('mysql2');

const pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
   database: 'node-learn',
   password: 'Cherish-123'
})

module.exports = pool.promise();

*/