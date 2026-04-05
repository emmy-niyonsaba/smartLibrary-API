import express from 'express';
import cors from 'cors';
import userRoutes from './routers/userRouters.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api', userRoutes);
app.use('/api', BookRoutes);


const port = 3000;

app.get('/health', (req, res) => {
  res.status(200).send('App is Learning ');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.on('error', (err) => {
    console.error('Server error:', err);
}   );


