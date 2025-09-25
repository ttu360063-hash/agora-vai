const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');

// GET /api/rentals
router.get('/', async (req, res) => {
  try {
    const rentals = await Rental.getAll();
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/rentals/:id
router.get('/:id', async (req, res) => {
  try {
    const rental = await Rental.getById(req.params.id);
    if (!rental) return res.status(404).json({ error: 'Rental not found' });
    res.json(rental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/rentals/active
router.get('/ativos', async (req, res) => {
  try {
    const rentals = await Rental.getActive();
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/rentals/completed
router.get('/finalizados', async (req, res) => {
  try {
    const rentals = await Rental.getCompleted();
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/rentals
router.post('/', async (req, res) => {
  try {
    const rental = await Rental.create(req.body);
    res.status(201).json(rental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/rentals/:id
router.put('/:id', async (req, res) => {
  try {
    const rental = await Rental.update(req.params.id, req.body);
    if (!rental) return res.status(404).json({ error: 'Rental not found' });
    res.json(rental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/rentals/:id
router.delete('/:id', async (req, res) => {
  try {
    await Rental.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
