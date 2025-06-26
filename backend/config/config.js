require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PWD,
        database: process.env.DB_NAME || 'beholder_dev',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: process.env.DB_LOGS === 'true' ? console.log : false,
        ssl: process.env.NODE_ENV === 'production',
        dialectOptions: process.env.NODE_ENV === 'production' ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {}
    },
    test: {
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PWD,
        database: process.env.DB_NAME || 'beholder_test',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: process.env.NODE_ENV === 'production' ? {
                require: true,
                rejectUnauthorized: false
            } : false
        }
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};