import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { API_URL } from '../config';
import { API_URL } from '../config';

const EquipmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    price_per_day: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/equipamentos`, formData);
      alert('Equipamento criado com sucesso!');
      setFormData({ name: '', description: '', quantity: '', price_per_day: '' });
    } catch (err) {
      alert('Erro ao criar equipamento: ' + err.message);
    }
  };

  return (
    <div className="section">
      <h2>Cadastrar Equipamento</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Quantidade:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Preço por Dia:</label>
          <input type="number" step="0.01" name="price_per_day" value={formData.price_per_day} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn">Cadastrar</button>
      </form>
    </div>
  );
};

export default EquipmentForm;
