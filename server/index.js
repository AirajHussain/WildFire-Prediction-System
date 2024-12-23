const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Allow CORS for React
app.use(cors());

// Create database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Halal123!0', // Update with your MySQL root password
  database: 'wildfire_data',
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define the /api/data route
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM env_data';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
