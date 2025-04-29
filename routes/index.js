const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('resources.db'); // Buat database SQLite
const path = require('path')


db.run(`CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  filename TEXT
)`);

router.get('/', (req, res) => {
  db.all('SELECT * FROM resources', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('index', { resources: rows });
  });
});


router.get('/upload', (req, res) => {
    res.render('upload');
});


router.post('/upload', upload.single('file'), (req, res) => {
    const { title, description } = req.body;
    const filename = req.file.filename;
  
    db.run('INSERT INTO resources (title, description, filename) VALUES (?, ?, ?)', [title, description, filename], function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`File uploaded: ${filename}`);
      res.redirect('/');
    });
  
  });
  
  // Menangani permintaan file yang diunggah
  router.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    res.sendFile(filePath, (err) =>{
        if(err){
            console.error("Error saat mengambil file:", err)
            // Handle error, misalnya dengan mengirimkan response error
            res.status(404).send("File tidak ditemukan.");
        }
    });
  });


module.exports = router;