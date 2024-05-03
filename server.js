const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const cors = require('cors')
const products_route = require('./routers/router')
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api', products_route)

app.get('/api', (req, res) => {
    res.json({ message: 'Server running well bro' });
})


app.listen(port, () => {
    console.log('server running well');
})