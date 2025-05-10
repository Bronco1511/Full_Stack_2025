const db = require('../database');

const Student = {
  getAll: (callback) => {
    db.all('SELECT * FROM students', [], callback);
  },
  add: (student, callback) => {
    const { name, class: studentClass } = student;
    db.run('INSERT INTO students (name, class) VALUES (?, ?)', [name, studentClass], callback);
  },
  updateVaccination: (id, vaccinationData, callback) => {
    const { vaccinated, vaccine_name, vaccination_date } = vaccinationData;
    db.run('UPDATE students SET vaccinated = ?, vaccine_name = ?, vaccination_date = ? WHERE id = ?', [vaccinated, vaccine_name, vaccination_date, id], callback);
  },
  delete: (id, callback) => {
    db.run('DELETE FROM students WHERE id = ?', [id], callback);
  }
};

module.exports = Student;

