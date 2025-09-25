const pool = require('../config/database');

class Client {
  static async getAll() {
    const result = await pool.query('SELECT * FROM clients');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { name, email, phone, address } = data;
    const result = await pool.query(
      'INSERT INTO clients (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, address]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { name, email, phone, address } = data;
    const result = await pool.query(
      'UPDATE clients SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5 RETURNING *',
      [name, email, phone, address, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM clients WHERE id = $1', [id]);
  }
}

module.exports = Client;
