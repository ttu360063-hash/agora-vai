const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// GET /api/clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.getAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/clients/:id
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.getById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/clients
router.post('/', async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/clients/:id
router.put('/:id', async (req, res) => {
  try {
    const client = await Client.update(req.params.id, req.body);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/clients/:id
router.delete('/:id', async (req, res) => {
  try {
    await Client.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
