const db = require('../database');

const Drive = {
  getAll: (callback) => {
    db.all('SELECT * FROM drives', [], callback);
  },
  add: (drive, callback) => {
    const { vaccine_name, drive_date, doses, classes } = drive;
    db.run('INSERT INTO drives (vaccine_name, drive_date, doses, classes) VALUES (?, ?, ?, ?)', [vaccine_name, drive_date, doses, classes], callback);
  },
  update: (id, drive, callback) => {
    const { drive_date, doses } = drive;
    db.run('UPDATE drives SET drive_date = ?, doses = ? WHERE id = ?', [drive_date, doses, id], callback);
  }
};

module.exports = Drive;

