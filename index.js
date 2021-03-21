const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config/default.json');
const routes = require('./routes/index');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

app.listen(config.server_port, () => {
    console.log(`Inventory service started on port ${config.server_port}`);
});