const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const authMiddleware = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const settingsRouter = require('./routers/settingsRouter');
const symbolsRouter = require('./routers/symbolsRouter');
const exchangeRouter = require('./routers/exchangeRouter');
const ordersRouter = require('./routers/ordersRouter');
const monitorsRouter = require('./routers/monitorsRouter');
const automationsRouter = require('./routers/automationsRouter');
const orderTemplatesRouter = require('./routers/orderTemplatesRouter');
const withdrawTemplatesRouter = require('./routers/withdrawTemplatesRouter');
const beholderRouter = require('./routers/beholderRouter');
const logsRouter = require('./routers/logsRouter');
const riskRouter = require('./routers/riskRouter');
const backtestRouter = require('./routers/backtestRouter');
const webhookRouter = require('./routers/webhookRouter');

const authController = require('./controllers/authController');

const app = express();

// Trust proxy for Railway
app.set('trust proxy', 1);

// Development logging
if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Security middlewares
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https:"],
            scriptSrc: ["'self'", "https:"],
            connectSrc: ["'self'", "https:", "wss:"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false
}));

// CORS
app.use(cors({ 
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    optionsSuccessStatus: 200
}));

// Compression
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    message: {
        error: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts
    skipSuccessfulRequests: true,
    message: {
        error: 'Too many authentication attempts, please try again later.'
    }
});

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'Beholder API is running!',
        version: '3.0.0',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};

// Auth routes with validation
app.post('/api/login', 
    authLimiter,
    [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 6 })
    ],
    validate,
    authController.doLogin
);

app.post('/api/logout', authController.doLogout);

// Protected API routes
app.use('/api/settings', authMiddleware, settingsRouter);
app.use('/api/symbols', authMiddleware, symbolsRouter);
app.use('/api/exchange', authMiddleware, exchangeRouter);
app.use('/api/orders', authMiddleware, ordersRouter);
app.use('/api/monitors', authMiddleware, monitorsRouter);
app.use('/api/automations', authMiddleware, automationsRouter);
app.use('/api/ordertemplates', authMiddleware, orderTemplatesRouter);
app.use('/api/withdrawtemplates', authMiddleware, withdrawTemplatesRouter);
app.use('/api/beholder', authMiddleware, beholderRouter);
app.use('/api/logs', authMiddleware, logsRouter);
app.use('/api/risk', authMiddleware, riskRouter);
app.use('/api/backtest', authMiddleware, backtestRouter);

// Webhook routes (no auth required)
app.use('/webhook', webhookRouter);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// Error handling
app.use(errorMiddleware);

module.exports = app;