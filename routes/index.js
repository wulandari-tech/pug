const express = require('express');
const router = express.Router();
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('resources.db'); // Buat database SQLite
const path = require('path');

// Pastikan tabel ada
db.run(`CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  filename TEXT
)`);

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../views/index.html');
      // Kirim file HTML secara langsung
      res.sendFile(filePath);

  });
router.get('/upload', (req, res) => {
  res.render('upload');
});

router.post('/upload', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  const filename = req.file.filename;

  db.run('INSERT INTO resources (title, description, filename) VALUES (?, ?, ?)', [title, description, filename], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`File uploaded: ${filename}`);
    res.redirect('/');
  });

});


router.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    res.sendFile(filePath, (err) =>{
        if(err){
            console.error("Error saat mengambil file:", err)
            res.status(404).send("File tidak ditemukan.");
        }
    });
  });
  
module.exports = router;