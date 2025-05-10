import React from 'react';

function Reports() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const downloadReport = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/students");
      const students = await response.json();

      if (!Array.isArray(students)) {
        alert("Invalid data received");
        return;
      }

      const header = "Name,Class,Vaccinated";
      const rows = students.map(s => `${s.name},${s.class},${s.vaccinated ? "Yes" : "No"}`);
      const csvData = [header, ...rows].join("\n");

      const blob = new Blob([csvData], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "vaccination_report.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching report data:", error);
      alert("Failed to download report.");
    }
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
        <h2>Reports</h2>
        <p>This is the Reports page.</p>
        <button onClick={downloadReport}>Download Report</button>
      </div>
    </div>
  );
}

export default Reports;
