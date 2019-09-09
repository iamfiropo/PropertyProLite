const { Pool } = require('pg');
const { config } = require('dotenv');
const Debug = require('debug');

config();
const debug = Debug('http');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  debug('connected to the db');
});

class PropertyPro {
/**
 * Create User's Table
 */
  static async createUserTable() {
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

    await pool.query(queryText)
      .then((res) => {
        debug(res);
        // pool.end();
      })
      .catch((err) => {
        debug(err);
        // pool.end();
      });
  }

  /**
   * Create Property's Table
   */
  static async createPropertyTable() {
    const queryText = `CREATE TABLE IF NOT EXISTS
                    property(
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

    await pool.query(queryText)
      .then((res) => {
        debug(res);
        // pool.end();
      })
      .catch((err) => {
        debug(err);
        // pool.end();
      });
  }

  /**
   * Drop Reflection Table
   */
  static async dropReflectionTable() {
    const queryText = 'DROP TABLE IF EXISTS reflections returning *';
    await pool.query(queryText)
      .then((res) => {
        debug(res);
        // pool.end();
      })
      .catch((err) => {
        debug(err);
        // pool.end();
      });
  }
  /**
   * Drop User Table
   */

  static async dropUserTable() {
    const queryText = 'DROP TABLE IF EXISTS users returning *';
    await pool.query(queryText)
      .then((res) => {
        debug(res);
        // pool.end();
      })
      .catch((err) => {
        debug(err);
        // pool.end();
      });
  }
  /**
   * Create All Tables
   */

  static async createAllTables() {
    createUserTable();
    createPropertyTable();
  }

  /**
   * Drop All Tables
   */
  static async dropAllTables() {
    dropUserTable();
    dropReflectionTable();
  }
}

pool.on('remove', () => {
  debug('client removed');
  process.exit(0);
});

export {
  createAllTables, dropAllTables,
};

require('make-runnable');
