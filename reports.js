const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET /api/reports/revenue
router.get('/faturamento', async (req, res) => {
  try {
    const result = await pool.query('SELECT SUM(total_cost) as total_revenue FROM rentals WHERE return_date IS NOT NULL');
    res.json({ total_revenue: result.rows[0].total_revenue || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reports/clients
router.get('/clientes', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT c.* FROM clients c JOIN rentals r ON c.id = r.client_id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reports/equipment
router.get('/equipamentos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, COUNT(r.id) as rental_count
      FROM equipment e
      LEFT JOIN rentals r ON e.id = r.equipment_id
      GROUP BY e.id
      ORDER BY rental_count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reports/stock
router.get('/estoque', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.name, e.quantity, 
             COALESCE(SUM(CASE WHEN r.return_date IS NULL THEN 1 ELSE 0 END), 0) as rented,
             e.quantity - COALESCE(SUM(CASE WHEN r.return_date IS NULL THEN 1 ELSE 0 END), 0) as available
      FROM equipment e
      LEFT JOIN rentals r ON e.id = r.equipment_id
      GROUP BY e.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
