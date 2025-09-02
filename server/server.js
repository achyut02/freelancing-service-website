const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration for frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Sample healthcare route
app.get('/api/healthcare', (req, res) => {
  res.status(200).json({
    category: 'healthcare',
    services: [
      { id: 1, name: 'General Practitioner', description: 'Primary healthcare services', rating: 4.8 },
      { id: 2, name: 'Dental Care', description: 'Professional dental services', rating: 4.9 },
      { id: 3, name: 'Specialist Consultation', description: 'Expert medical consultation', rating: 4.7 }
    ],
    totalProviders: 1200,
    message: 'Healthcare services available'
  });
});

// Sample fitness route
app.get('/api/fitness', (req, res) => {
  res.status(200).json({
    category: 'fitness',
    services: [
      { id: 1, name: 'Personal Training', description: 'One-on-one fitness coaching', rating: 4.9 },
      { id: 2, name: 'Yoga Classes', description: 'Mind and body wellness', rating: 4.8 },
      { id: 3, name: 'Gym Membership', description: 'Access to fitness facilities', rating: 4.6 }
    ],
    totalProviders: 800,
    message: 'Fitness services available'
  });
});

// Signup route
app.post('/api/signup', (req, res) => {
  try {
    const { username, password, email, role = 'user' } = req.body;
    
    // Basic validation
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'Username, password, and email are required'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    // In a real app, you'd save to database here
    // For now, return success response
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: Date.now(), // Mock ID
        username,
        email,
        role,
        createdAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during signup'
    });
  }
});

// Login route
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // Mock authentication - in real app, check database
    if (email === 'test@example.com' && password === 'password123') {
      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: 1,
          email,
          username: 'testuser',
          role: 'user'
        },
        token: 'mock-jwt-token-' + Date.now()
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login'
    });
  }
});

// Generic category route for other services
app.get('/api/:category', (req, res) => {
  const { category } = req.params;
  
  // Return sample data for any category
  res.status(200).json({
    category,
    services: [
      { id: 1, name: `${category} Service 1`, description: `Professional ${category} services`, rating: 4.5 },
      { id: 2, name: `${category} Service 2`, description: `Expert ${category} consultation`, rating: 4.7 }
    ],
    totalProviders: Math.floor(Math.random() * 1000) + 100,
    message: `${category} services available`
  });
});

// Catch-all route for undefined endpoints
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    availableRoutes: [
      'GET /api/health',
      'GET /api/healthcare',
      'GET /api/fitness',
      'POST /api/signup',
      'POST /api/login',
      'GET /api/:category'
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📋 Available routes:`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   GET  /api/healthcare - Healthcare services`);
  console.log(`   GET  /api/fitness - Fitness services`);
  console.log(`   POST /api/signup - User registration`);
  console.log(`   POST /api/login - User authentication`);
  console.log(`   GET  /api/:category - Generic category services`);
  console.log(`\n🔗 Frontend should connect to: http://localhost:${PORT}`);
});

module.exports = app;

