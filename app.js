const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Error handling middleware (contoh sederhana)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});  

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});