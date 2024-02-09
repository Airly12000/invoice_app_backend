const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const Invoices = require('../routes/Invoices');
// const mysql = require('mysql2');
// const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '../', '.env') });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Routes
app.use('/api/routes', Invoices);

module.exports.handler = serverless(app);
