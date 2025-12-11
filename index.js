const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (required for ALB health checks)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Node.js API!',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    server: {
      node_version: process.version,
      platform: process.platform,
      arch: process.arch
    }
  });
});

// API endpoints
app.get('/api/status', (req, res) => {
  res.json({
    api: 'Node.js API',
    version: '1.0.0',
    environment: NODE_ENV,
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/users', (req, res) => {
  // Mock data - replace with database queries in Phase 3
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required'
    });
  }
  
  // Mock creation - replace with database insert in Phase 3
  const newUser = {
    id: Date.now(),
    name,
    email,
    created_at: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'User created successfully'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  res.status(500).json({
    success: false,
    error: NODE_ENV === 'production' ? 'Internal server error' : err.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    requested_url: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// // Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});

console.log("APP")