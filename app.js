const express = require('express');
const app = express();
const port = 3000
const uploadCsv = require('./routes/upload-csv')
const payrollReport = require('./routes/payroll-report')

app.use('/', uploadCsv);
app.use('/', payrollReport);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
