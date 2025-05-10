import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#007bff', color: '#fff' }}>
      <Link to="/dashboard" style={{ margin: '0 1rem', color: '#fff' }}>Dashboard</Link>
      <Link to="/students" style={{ margin: '0 1rem', color: '#fff' }}>Students</Link>
      <Link to="/drives" style={{ margin: '0 1rem', color: '#fff' }}>Drives</Link>
      <Link to="/reports" style={{ margin: '0 1rem', color: '#fff' }}>Reports</Link>
    </nav>
  );
}

export default Navbar;

