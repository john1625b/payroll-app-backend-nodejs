const http = require('http');
const fs = require('fs');

const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');

const Router = express.Router;
const upload = multer({ dest: 'tmp/csv/' });
const app = express();
const router = new Router();
const server = http.createServer(app);
const port = 3000

router.post('/', upload.single('file'), function (req, res) {
    const fileRows = [];

    if (!req.file) {
        res.send('csv not received')
    }

    // open uploaded file
    csv.parseFile(req.file.path)
        .on("data", function (data) {
            fileRows.push(data); // push each row
        })
        .on('error', error => {
            res.send('Error parsing csv. Make sure the csv is in proper format')
        })
        .on("end", function () {
            console.log(fileRows)
            fs.unlinkSync(req.file.path);   // remove temp file
            //process "fileRows" and respond
            res.send('file successfully uploaded')
        })
});

app.use('/upload-csv', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})