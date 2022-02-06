const fs = require('fs');
const csv = require('fast-csv');
const moment = require('moment')
const db = require('../services/clients')

const uploadCsvController = (req, res) => {
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
            res.status(400)
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
}

module.exports = uploadCsvController