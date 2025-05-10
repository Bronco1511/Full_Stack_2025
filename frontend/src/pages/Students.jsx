import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get('/students');
    setStudents(res.data);
  };

  const addStudent = async (e) => {
    e.preventDefault();
    await api.post('/students', { name, class: studentClass });
    setName('');
    setStudentClass('');
    fetchStudents();
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
        <h2>Students Management</h2>

        <form onSubmit={addStudent}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br /><br />
          <input
            placeholder="Class"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          />
          <br /><br />
          <button type="submit">Add Student</button>
        </form>

        <h3>Student List</h3>
        <ul>
          {students.map((s) => (
            <li key={s.id}>
              {s.name} - Class {s.class} - {s.vaccinated ? 'Vaccinated' : 'Not Vaccinated'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Students;

