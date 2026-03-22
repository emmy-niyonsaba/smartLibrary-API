
import * as dotenv from 'dotenv';
dotenv.config();


// connection to the database using sequelize
import { Sequelize } from 'sequelize';
const pool = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
        host: process.env.PGHOST,
        dialect: 'postgres',
        ssl: {
            rejectUnauthorized: false
        }
    }
);

pool.authenticate()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Database connection error:', err));  
pool.sync({force: true})
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Database synchronization error:', err));
// connection to the database using pg
// import { Pool } from 'pg';
//  const pool = new Pool({
//     host: process.env.PGHOST,
//     database: process.env.PGDATABASE,
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD,
//     ssl: {
//         rejectUnauthorized: false
//     },
//     channelBinding: process.env.PGCHANNELBINDING
// });
// pool.connect()
//     .then(() => console.log('Connected to the database'))
//     .catch((err) => console.error('Database connection error:', err));

// pool.on('error', (err) => {
//     console.error('Unexpected error on idle client', err);
//     process.exit(-1);
// })
// pool.on('connect', () => {
//     console.log('Database connection established');
// });
// pool.on('remove', () => {
//     console.log('Database client removed');
// }); 


export default pool;

