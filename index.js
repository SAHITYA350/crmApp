import dotenv from 'dotenv';
dotenv.config(); // Load .env file first

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ Connection failed:', err));

  import customerRouter from './routes/customer.routes.js'
  import logRouter from './routes/log.routes.js';
  const app = express();

app.get('/', (req, res) => res.send('Connection Successful!'));

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/customer', customerRouter);
app.use('/logs', logRouter);