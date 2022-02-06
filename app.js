const express = require('express');
const app = express();
const port = 3000
const uploadCsv = require('./routes/upload-csv')

app.use('/', uploadCsv);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
