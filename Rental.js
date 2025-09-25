const pool = require('../config/database');

class Rental {
  static async getAll() {
    const result = await pool.query(`
      SELECT r.*, c.name as client_name, e.name as equipment_name
      FROM rentals r
      JOIN clients c ON r.client_id = c.id
      JOIN equipment e ON r.equipment_id = e.id
    `);
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(`
      SELECT r.*, c.name as client_name, e.name as equipment_name
      FROM rentals r
      JOIN clients c ON r.client_id = c.id
      JOIN equipment e ON r.equipment_id = e.id
      WHERE r.id = $1
    `, [id]);
    return result.rows[0];
  }

  static async getActive() {
    const result = await pool.query(`
      SELECT r.*, c.name as client_name, e.name as equipment_name
      FROM rentals r
      JOIN clients c ON r.client_id = c.id
      JOIN equipment e ON r.equipment_id = e.id
      WHERE r.return_date IS NULL
    `);
    return result.rows;
  }

  static async getCompleted() {
    const result = await pool.query(`
      SELECT r.*, c.name as client_name, e.name as equipment_name
      FROM rentals r
      JOIN clients c ON r.client_id = c.id
      JOIN equipment e ON r.equipment_id = e.id
      WHERE r.return_date IS NOT NULL
    `);
    return result.rows;
  }

  static async create(data) {
    const { client_id, equipment_id, rental_date, return_date, total_cost } = data;
    const result = await pool.query(
      'INSERT INTO rentals (client_id, equipment_id, rental_date, return_date, total_cost) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [client_id, equipment_id, rental_date, return_date, total_cost]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const { client_id, equipment_id, rental_date, return_date, total_cost } = data;
    const result = await pool.query(
      'UPDATE rentals SET client_id = $1, equipment_id = $2, rental_date = $3, return_date = $4, total_cost = $5 WHERE id = $6 RETURNING *',
      [client_id, equipment_id, rental_date, return_date, total_cost, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM rentals WHERE id = $1', [id]);
  }
}

module.exports = Rental;
