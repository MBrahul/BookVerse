const express = require('express');
require('dotenv').config({ path: '.env' });
const connnectToDb = require('./db.js');
const cors = require('cors');
const fetchUser = require('./middlewares/fetchuser.js');
const verifyRole = require('./middlewares/verifyRole.js');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;

// const corsOptions = {
//     origin: 'http://localhost:5173', 
//     credentials: true // Enable set cookie
// };


connnectToDb();



app.use('/api/auth', require('./routes/auth'));
app.use('/api/book', require('./routes/book'));
app.use('/api/favourite', fetchUser, verifyRole('user'), require('./routes/favourite'));
app.use('/api/cart', fetchUser, verifyRole('user'), require('./routes/cart'));
app.use('/api/order', fetchUser, require('./routes/order'));


app.get('/', (req, res) => {
    res.send("Server is running");
})


app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})