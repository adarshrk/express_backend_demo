const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config/default.json');
const routes = require('./routes/index');
const { getMongoConnection } = require('./helpers/getDbConnection');
const swaggerDocument = require('./swagger-output.json');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(helmet());
app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(getMongoConnection);
const clientAuthMiddleware = () => (req, res, next) => {
    if (req.protocol === 'https' && !req.client.authorized) {
      return res.status(401).send('Invalid client certificate authentication.');
    }
    return next();
};
app.use(clientAuthMiddleware());

app.use('/', routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const options = {
    key: fs.readFileSync(`${__dirname}/2-way-ssl-helper/serverCerts/server-key.pem`),
    cert: fs.readFileSync(`${__dirname}/2-way-ssl-helper/serverCerts/server-crt.pem`),
    ca: [
      fs.readFileSync(`${__dirname}/2-way-ssl-helper/clientCerts/client-ca-crt.pem`)
    ],
    // Requesting the client to provide a certificate, to authenticate.
    requestCert: true,
    // As specified as "true", so no unauthenticated traffic
    // will make it to the specified route specified
    rejectUnauthorized: false
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(3000, () => console.log("server starting on port : " + 3000));
httpsServer.listen(8000, () => console.log("server starting on port : " + 8000));
