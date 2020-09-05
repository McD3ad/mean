require('dotenv').config();

const app = require('express')();
const mongoose = require('mongoose');
const bp = require('body-parser');
const cors = require('cors');

const { auth, todos } = require('./routes');

app.use(bp.json());
app.use(bp.urlencoded());
app.use(cors());

app.use('/', auth, todos);

const start = async () => {
    try {

        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-9cgqf.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`, {
            useNewUrlParser: true, useUnifiedTopology: true
        });

        app.listen(process.env.SERVER_PORT, () => {
            console.log('Server starts at port ' + process.env.SERVER_PORT);
        });

    } catch (error) {
        console.error(error.message);
    }
}

start();