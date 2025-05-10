import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/dashboard')
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error('Dashboard fetch error:', err);
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <div style={{
        backgroundColor: '#2979ff',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <a href="/dashboard" style={{ color: 'white', marginRight: '20px' }}>Dashboard</a>
          <a href="/students" style={{ color: 'white', marginRight: '20px' }}>Students</a>
          <a href="/drives" style={{ color: 'white', marginRight: '20px' }}>Drives</a>
          <a href="/reports" style={{ color: 'white', marginRight: '20px' }}>Reports</a>
        </div>
        <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
      </div>

      <div style={{ padding: '2rem' }}>
        <h2>Dashboard</h2>
        <p>Total Students: {data.total_students ?? 'N/A'}</p>
        <p>Vaccinated Students: {data.vaccinated_students ?? 'N/A'}</p>
        <p>Vaccination Rate: {data.percentage_vaccinated ?? 'N/A'}%</p>
        <h3>Upcoming Drives:</h3>
        {Array.isArray(data.upcoming_drives) && data.upcoming_drives.length > 0 ? (
          <ul>
            {data.upcoming_drives.map((drive, idx) => (
              <li key={idx}>{drive.vaccine_name} on {drive.drive_date}</li>
            ))}
          </ul>
        ) : (
          <p>No upcoming drives.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

