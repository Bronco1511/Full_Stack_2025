const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const driveRoutes = require('./routes/drives');
const dashboardRoutes = require('./routes/dashboard');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/drives', driveRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = 5001;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));

