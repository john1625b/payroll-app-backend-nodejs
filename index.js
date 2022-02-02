import express from 'express'
import multer from 'multer'
import csv from 'fast-csv'
import bodyParser from "body-parser";

const upload = multer({ dest: 'tmp/csv/' });
const app = express()
const port = 3000
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.json())

app.post("/", jsonParser, (req, res) => {
    // const csvData = {}
    // const CSV_STRING = req
    // console.log(CSV_STRING)

    console.log('req.body', req.body)
    res.send({a:123})

    // csv.parseFile(CSV_STRING, {
    //     headers: ["count", "value"],
    //     ignoreEmpty: true,
    // })
    //     .on("data", function (data) {
    //         csvData[data.value] = data
    //     })
    //     .on("end", function () {
    //         console.log(csvData)
    //         //make call to database
    //         res.send("Done")
    //     })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})