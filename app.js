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

// todo: put jobgroup on different table
// todo: dont insert if already exists
// todo: tests
// todo: fix query to have nested object
// todo: clean up client


// todo: make script for creating table
// todo: hide bucket
