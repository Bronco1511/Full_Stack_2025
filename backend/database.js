const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    class TEXT NOT NULL,
    vaccinated INTEGER DEFAULT 0,
    vaccine_name TEXT,
    vaccination_date TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS drives (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vaccine_name TEXT NOT NULL,
    drive_date TEXT NOT NULL,
    doses INTEGER NOT NULL,
    classes TEXT NOT NULL
  )`);
});

module.exports = db;

