require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Health Check Route
app.get('/', (req, res) => {
    res.json({ message: 'BaiN.Ai Anti-Sniping API is running' });
});

// Example API Route
app.get('/api/v1/status', (req, res) => {
    res.json({ status: 'active', uptime: process.uptime() });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Export for testing
module.exports = app;
