const Sequelize = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'production') {
    // Railway automatically provides DATABASE_URL
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: process.env.DB_LOGS === 'true' ? console.log : false,
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
    });
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME || 'beholder_dev',
        process.env.DB_USER || 'postgres',
        process.env.DB_PWD,
        {
            dialect: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            logging: process.env.DB_LOGS === 'true' ? console.log : false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
}

module.exports = sequelize;