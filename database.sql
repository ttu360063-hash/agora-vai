-- Create database
CREATE DATABASE rental_system;

-- Use the database
\c rental_system;

-- Create clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  address TEXT
);

-- Create equipment table
CREATE TABLE equipment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  quantity INT NOT NULL,
  price_per_day DECIMAL(10,2) NOT NULL
);

-- Create rentals table
CREATE TABLE rentals (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES clients(id),
  equipment_id INT REFERENCES equipment(id),
  rental_date DATE NOT NULL,
  return_date DATE,
  total_cost DECIMAL(10,2)
);
