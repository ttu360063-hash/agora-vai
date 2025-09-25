import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { API_URL } from '../config';
import { API_URL } from '../config';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/clientes`, formData);
      alert('Cliente criado com sucesso!');
      setFormData({ name: '', email: '', phone: '', address: '' });
    } catch (err) {
      alert('Erro ao criar cliente: ' + err.message);
    }
  };

  return (
    <div className="section">
      <h2>Cadastrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Endereço:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} />
        </div>
        <button type="submit" className="btn">Cadastrar</button>
      </form>
    </div>
  );
};

export default ClientForm;
