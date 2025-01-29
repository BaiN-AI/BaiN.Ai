require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Configure logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'), { flags: 'a' }
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev', { 
  stream: NODE_ENV === 'production' ? accessLogStream : null 
}));

// Health Check Endpoint
app.get('/api/v1/status', (req, res) => {
  res.status(200).json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// Server Initialization
app.listen(PORT, () => {
  console.log(`BaiN.Ai AntiSniping API running in ${NODE_ENV} mode on port ${PORT}`);
});
