const pool = require('../config/database');

class Equipment {
  static async getAll() {
    const result = await pool.query('SELECT * FROM equipment');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM equipment WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const { name, description, quantity, price_per_day } = data;
    const result = await pool.query(
      'INSERT INTO equipment (name, description, quantity, price_per_day) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, quantity, price_per_day]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { name, description, quantity, price_per_day } = data;
    const result = await pool.query(
      'UPDATE equipment SET name = $1, description = $2, quantity = $3, price_per_day = $4 WHERE id = $5 RETURNING *',
      [name, description, quantity, price_per_day, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM equipment WHERE id = $1', [id]);
  }
}

module.exports = Equipment;
