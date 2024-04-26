const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();

app.use(
    cors()
);

app.use(
    express.json()
);

const conn = require('./database/conn');

conn();

const routes = require('./routes/router');

app.use(
    '/api', routes
);

app.listen(port,
    () => {
        console.log('Servidor executando!');
    }
);