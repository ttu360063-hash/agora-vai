import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { API_URL } from '../config';
import { API_URL } from '../config';

const RentalForm = () => {
  const [formData, setFormData] = useState({
    client_id: '',
    equipment_id: '',
    rental_date: '',
    return_date: '',
    total_cost: ''
  });
  const [clients, setClients] = useState([]);
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, equipmentRes] = await Promise.all([
          axios.get(`${API_URL}/api/clientes`),
          axios.get(`${API_URL}/api/equipamentos`)
        ]);
        setClients(clientsRes.data);
        setEquipment(equipmentRes.data);
      } catch (err) {
        console.error('Erro ao buscar dados: ' + err.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/alugueis`, formData);
      alert('Aluguel criado com sucesso!');
      setFormData({ client_id: '', equipment_id: '', rental_date: '', return_date: '', total_cost: '' });
    } catch (err) {
      alert('Erro ao criar aluguel: ' + err.message);
    }
  };

  return (
    <div className="section">
      <h2>Criar Aluguel</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cliente:</label>
          <select name="client_id" value={formData.client_id} onChange={handleChange} required>
            <option value="">Selecione um cliente</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Equipamento:</label>
          <select name="equipment_id" value={formData.equipment_id} onChange={handleChange} required>
            <option value="">Selecione um equipamento</option>
            {equipment.map(eq => (
              <option key={eq.id} value={eq.id}>{eq.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Data de Aluguel:</label>
          <input type="date" name="rental_date" value={formData.rental_date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Data de Devolução:</label>
          <input type="date" name="return_date" value={formData.return_date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Custo Total:</label>
          <input type="number" step="0.01" name="total_cost" value={formData.total_cost} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn">Criar Aluguel</button>
      </form>
    </div>
  );
};

export default RentalForm;
