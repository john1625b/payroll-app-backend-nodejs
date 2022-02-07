const db = require('../services/clients')
const moment = require('moment')

const payrollReport = (req, res) => {
    const query1 = `
        SELECT 
             id as employeeId,
             IIF( CAST(strftime('%d', date) as integer) <= 15, DATE(date, 'start of month'), DATE(date, 'start of month', '+15 day')) as bucket,
             IIF(jobGroup = 'A', 20 * sum(hours), 30 * sum(hours) ) as amountPaid
        FROM employee
        GROUP BY id, bucket
        `
    db.all(query1, (err, data) => {
        if (err) {
            res.status(400)
            res.send('error retrieving pay-roll report')
        }
        // transform data structure to have nested JSON of payPeriod since Sqllite does not have native support
        // for converting column to JSON
        data = data.map(row => {
            const startDate = row.bucket
            let endDate
            const bucket = moment(startDate, 'YYYY-MM-DD')
            const day = parseInt(bucket.format('DD'))
            if (day === 1) {
                endDate = bucket.add('days', 14).format('YYYY-MM-DD')
            } else {
                endDate = bucket.endOf('month').format('YYYY-MM-DD')
            }
            delete row.bucket
            return {...row, "payPeriod": {
                startDate: startDate, endDate: endDate
                }
            }
        })
        console.log('loggingdb in route', data);
        res.send(data)
    })
}

module.exports = payrollReport
