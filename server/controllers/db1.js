const { Pool } = require('pg');
const { config } = require('dotenv');

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Property Table
 */
const createPropertyTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
            CREATE TABLE property(
              id SERIAL PRIMARY KEY,
              owner INTEGER REFERENCES users(id) ON DELETE CASCADE,
              status VARCHAR(20) DEFAULT 'available',
              price REAL NOT NULL,
              state VARCHAR(50) NOT NULL,
              city VARCHAR(50) NOT NULL,
              address VARCHAR(100) NOT NULL,
              type TEXT NOT NULL,
              created_on TIMESTAMP DEFAULT NOW(),
              image_url VARCHAR(128),
              owner_email VARCHAR(80) NOT NULL,
              owner_phone_number VARCHAR(80) NOT NULL)`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
};

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
          users(
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            password TEXT NOT NULL,
            phone_number BIGINT NOT NULL,
            address VARCHAR(80) NOT NULL,
            is_admin BOOLEAN DEFAULT false)`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
};

/**
 * Drop Property Table
 */
const dropPropertyTable = () => {
  const queryText = 'DROP TABLE IF EXISTS property returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
};
/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      // pool.end();
    })
    .catch((err) => {
      console.log(err);
      // pool.end();
    });
};
/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createPropertyTable();
};
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropPropertyTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createPropertyTable,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropPropertyTable,
  dropAllTables
};

require('make-runnable');
