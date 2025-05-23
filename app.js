const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const indexRouter = require('./routes/index');

// Hapus atau komentari baris ini karena kita tidak menggunakan view engine
// app.set('view engine', 'ejs'); 

app.set('views', path.join(__dirname, 'views')); // Tetapkan direktori views


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/', indexRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});