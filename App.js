import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import EquipmentForm from './components/EquipmentForm';
import RentalForm from './components/RentalForm';
import Reports from './components/Reports';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="logo-container">
            <img src="https://i.imgur.com/JCFrC1y.jpg" alt="Logo" className="logo" />
            <h1 className="company-name">AÇO FORTE LTDA</h1>
          </div>
          <p className="subtitle">Sistema de Aluguel</p>
          <nav className="nav-buttons">
            <Link to="/clients" className="nav-btn">Clientes</Link>
            <Link to="/equipment" className="nav-btn">Equipamentos</Link>
            <Link to="/rentals" className="nav-btn">Aluguéis</Link>
            <Link to="/reports" className="nav-btn">Relatórios</Link>
          </nav>
        </header>
        <div className="container">
          <Routes>
            <Route path="/clients" element={<ClientForm />} />
            <Route path="/equipment" element={<EquipmentForm />} />
            <Route path="/rentals" element={<RentalForm />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/" element={<div className="section"><h2>Bem-vindo ao Sistema de Aluguel</h2></div>} />
          </Routes>
        </div>
        <footer className="footer">
          <p>&copy; 2023 AÇO FORTE LTDA. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
