const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const employees = require('./routes/api/employees');
const orders = require('./routes/api/orders');

const app = express();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: '25MB'
}));

require('./config/passportConfig')(passport);

const port = process.env.PORT || 5000;
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const mongodbURI = require('./config/keys').mongodbURI;

mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongodb Cloud Cluster Connected');
}).catch((err) => {
    console.error(err);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/employees', employees);
app.use('/api/orders', orders);

app.listen(port, () => {
    console.log(`Cafeteria Server is running on ${port}`);
});