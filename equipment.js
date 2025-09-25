const express = require('express');
const router = express.Router();
const Equipment = require('../models/Equipment');

// GET /api/equipment
router.get('/', async (req, res) => {
  try {
    const equipment = await Equipment.getAll();
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/equipment/:id
router.get('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.getById(req.params.id);
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/equipment
router.post('/', async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/equipment/:id
router.put('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.update(req.params.id, req.body);
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/equipment/:id
router.delete('/:id', async (req, res) => {
  try {
    await Equipment.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
