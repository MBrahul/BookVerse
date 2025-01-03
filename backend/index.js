const express = require('express');
require('dotenv').config({ path: '.env' });
const connnectToDb = require('./db.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;
// const corsOptions = {
//     origin: 'http://localhost:5173', // Replace with your frontend URL
//     credentials: true // Enable set cookie
// };


connnectToDb();



app.use('/api/auth',require('./routes/auth'));
app.use('/api/book',require('./routes/book'));
app.use('/api/favourite',require('./routes/favourite'));
app.use('/api/cart',require('./routes/cart'));
app.use('/api/order',require('./routes/order'));




app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`);
})