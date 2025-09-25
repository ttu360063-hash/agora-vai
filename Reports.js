import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { API_URL } from '../config';
import { API_URL } from '../config';

const Reports = () => {
  const [revenue, setRevenue] = useState(0);
  const [clients, setClients] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [revRes, clientsRes, eqRes, stockRes] = await Promise.all([
          axios.get(`${API_URL}/api/relatorios/faturamento`),
          axios.get(`${API_URL}/api/relatorios/clientes`),
          axios.get(`${API_URL}/api/relatorios/equipamentos`),
          axios.get(`${API_URL}/api/relatorios/estoque`)
        ]);
        setRevenue(revRes.data.total_revenue);
        setClients(clientsRes.data);
        setEquipment(eqRes.data);
        setStock(stockRes.data);
      } catch (err) {
        console.error('Erro ao buscar relatórios: ' + err.message);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="section">
      <h2>Relatórios</h2>
      <div className="summary">
        <h3>Faturamento Total: R$ {revenue.toFixed(2)}</h3>
      </div>
      <h3>Clientes que Alugaram</h3>
      <ul>
        {clients.map(client => (
          <li key={client.id}>{client.name} - {client.email}</li>
        ))}
      </ul>
      <h3>Equipamentos Mais Alugados</h3>
      <ul>
        {equipment.map(eq => (
          <li key={eq.id}>{eq.name} - Alugado {eq.rental_count} vezes</li>
        ))}
      </ul>
      <h3>Controle de Estoque</h3>
      <ul>
        {stock.map(item => (
          <li key={item.name}>{item.name} - Disponível: {item.available}, Alugado: {item.rented}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
