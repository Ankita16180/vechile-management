import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
  user: 'ankita',
  host: 'localhost',
  database: 'db',
  password: 'ankita@164',
  port: 5432
});

export default db;
