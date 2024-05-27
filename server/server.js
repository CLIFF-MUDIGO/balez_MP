const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;



const userRoutes = require('./routes/usersRoutes');
const productRoutes = require('./routes/productsRoute');


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`Node/Express server started on port ${port}`));