const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Change to your PostgreSQL username
  host: 'localhost',
  database: 'rental_system', // Database name
  password: 'password', // Change to your password
  port: 5432,
});

module.exports = pool;
