CREATE DATABASE network_ports;
USE network_ports;

CREATE TABLE ports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  location VARCHAR(50),
  rack VARCHAR(50),
  dispositivo VARCHAR(50),
  port_number VARCHAR(20),
  patchpanel VARCHAR(20),
  port_number_pp VARCHAR(20),
  description VARCHAR(255)
);