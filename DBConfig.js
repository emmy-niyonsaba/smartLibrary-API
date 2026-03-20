
const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');

 const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    channelBinding: process.env.PGCHANNELBINDING
});
pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Database connection error:', err));

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
pool.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Query result:', res);
    }
});

pool.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);  
    } else {
        console.log('Query result:', res.rows);
    }   
});
