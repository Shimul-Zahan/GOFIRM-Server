const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const cors = require('cors')
const products_route = require('./routers/router');
const { mongoose } = require('mongoose');
app.use(express.static('public'));
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api', products_route)

app.get("/", (req, res) => {
    return res.send("Working fine")
})

const connecting = () => {
    const uri = `mongodb+srv://quizeDB:W4VOxlogfo3vpsbD@cluster0.waps95s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    return uri;
}

const connectDB = async () => {
    console.log('testing.....');
    const test = connecting();
    await mongoose.connect(test, { dbName: 'GOFIRM' })
    console.log('connected to DB');
}

const final = async () => {
    await connectDB()
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

final()