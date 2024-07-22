require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./src/router');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.use('/', router);

app.listen(port, () => {
    console.log('웹서버 구동중... ', port);
});