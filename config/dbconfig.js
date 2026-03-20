
import * as dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';
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
})
pool.on('connect', () => {
    console.log('Database connection established');
});
pool.on('remove', () => {
    console.log('Database client removed');
}); 


export default pool;

