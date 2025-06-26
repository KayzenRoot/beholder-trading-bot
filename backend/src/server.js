require('dotenv').config();
const app = require('./app');
const db = require('./db');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        // Test database connection
        await db.authenticate();
        logger('system', 'Database connected successfully');
        
        // Start server
        app.listen(PORT, () => {
            logger('system', `Beholder API Server running on port ${PORT}`);
            logger('system', `Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        logger('system', `Failed to start server: ${error.message}`);
        process.exit(1);
    }
}

startServer();