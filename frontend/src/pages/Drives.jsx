import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Drives() {
  const [drives, setDrives] = useState([]);
  const [vaccineName, setVaccineName] = useState('');
  const [driveDate, setDriveDate] = useState('');
  const [doses, setDoses] = useState('');
  const [classes, setClasses] = useState('');

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const res = await api.get('/drives');
      setDrives(res.data);
    } catch (err) {
      console.error("Failed to fetch drives:", err);
    }
  };

  const scheduleDrive = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/drives', {
        vaccine_name: vaccineName,
        drive_date: driveDate,
        doses: parseInt(doses),
        classes: classes
      });

      alert("Drive scheduled successfully.");
      setVaccineName('');
      setDriveDate('');
      setDoses('');
      setClasses('');
      fetchDrives();
    } catch (err) {
      console.error("Schedule failed:", err);
      if (err.response?.data?.error) {
        alert("Error: " + err.response.data.error);
      } else {
        alert("Unexpected error occurred while scheduling.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

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
        <h2>Vaccination Drive Management</h2>

        <form onSubmit={scheduleDrive}>
          <input
            placeholder="Vaccine Name"
            value={vaccineName}
            onChange={(e) => setVaccineName(e.target.value)}
            required
          /><br /><br />
          <input
            type="date"
            value={driveDate}
            onChange={(e) => setDriveDate(e.target.value)}
            required
          /><br /><br />
          <input
            type="number"
            placeholder="Available Doses"
            value={doses}
            onChange={(e) => setDoses(e.target.value)}
            required
          /><br /><br />
          <input
            placeholder="Applicable Classes (comma separated)"
            value={classes}
            onChange={(e) => setClasses(e.target.value)}
            required
          /><br /><br />
          <button type="submit">Schedule Drive</button>
        </form>

        <h3>Scheduled Drives</h3>
        <ul>
          {drives.map((drive, idx) => (
            <li key={idx}>
              {drive.vaccine_name} on {drive.drive_date} for classes {drive.classes}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Drives;

