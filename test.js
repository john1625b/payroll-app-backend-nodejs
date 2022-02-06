const fs = require('fs');
const express = require('express');

const Router = express.Router;
const moment = require('moment')
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
const csv = require('fast-csv');
const db = require('./clients')

const app = express();
const router = new Router();
const port = 3000

router.post('/', upload.single('file'), function (req, res) {
    const fileRows = [];

    if (!req.file) {
        res.send('csv not received')
    }

    // open uploaded file
    csv.parseFile(req.file.path, { headers: true})
        .on("data", function (data) {
            // format date to ISO format
            data = {...data, date: moment(data.date, 'DD/MM/YYYY').format('YYYY-MM-DD')}
            fileRows.push(data); // push each row
        })
        .on('error', error => {
            res.send('Error parsing csv. Make sure the csv is in proper format')
        })
        .on("end", function () {
            console.log(fileRows)
            const stmt = db.prepare("INSERT INTO employee VALUES (?,?,?,?)");
            fileRows.map(row => {
                stmt.run(Object.values(row));
            })
            stmt.finalize();
            fs.unlinkSync(req.file.path);   // remove temp file
            //process "fileRows" and respond
            res.send('file successfully uploaded')
        })
});

app.use('/upload-csv', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
