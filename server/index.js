const express = require('express');
const uploadCsv = require('../routes/upload-csv')
const payrollReport = require('../routes/payroll-report')
const app = express();

app.use('/', uploadCsv);
app.use('/', payrollReport);

module.exports = app;