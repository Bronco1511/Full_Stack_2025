# School Vaccination Portal

Developer: Siddharth Gandhi  
Course: SE ZG503 FSAD II SEM 2024-2025  
Assignment: Full Stack Web Application Development


 Project Overview

This project is a web-based system to manage vaccination drives and track student vaccination status within a school environment.

It includes:
- Admin (school coordinator) login
- Dashboard with vaccination statistics
- Student Management (Add, View, Update, Bulk Upload via CSV)
- Vaccination Drive Management (Schedule Drives, View Drives)
- Report Generation (Export as CSV)
- SQLite database integration

Tech Stack

| Frontend        | Backend              | Database |
|:----------------|:---------------------|:---------|
| React.js (Vite) | Node.js (Express.js) | SQLite   |


How to Run the Project Locally

1. Setup Backend

===========
cd backend
npm install
npm start
==========

2. Setup Frontend

============
cd frontend
npm install
npm run dev
===========

Frontend server will run at: http://localhost:5173


3. Login Credentials

============================
Username: coordinator
Password: password123
============================

4. API ENDPOINTS

Method | Endpoint          | Description
POST   | /api/auth/login   | Login to system
GET    | /api/students     | Fetch all students
POST   | /api/students     | Add a new student
PUT    | /api/students/:id | Update vaccination status
DELETE | /api/students/:id | Delete student
GET    | /api/drives       | Get vaccination drives
POST   | /api/drives       | Schedule a new drive
PUT    | /api/drives/:id   | Edit existing drive
GET    | /api/dashboard    | Dashboard metrics


5. Database Schema

Students Table
====================

id (INTEGER, primary key)
name (TEXT)
class (TEXT)
vaccinated (INTEGER, default 0)
vaccine_name (TEXT)
vaccination_date (TEXT)

Drives Table
=====================

id (INTEGER, primary key)
vaccine_name (TEXT)
drive_date (TEXT)
doses (INTEGER)
classes (TEXT)

7. Postman API Collection

The Postman_Collection.json file is attached inside the docs/ folder for easy API testing.

8. Sample Files

sample_students.csv for bulk student upload is provided in the demo_files/ folder.
