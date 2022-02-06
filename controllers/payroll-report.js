const db = require('../clients')
const moment = require('moment')

const payrollReport = (req, res) => {
    const query1 = `
        select 
             id as employeeId,
             IIF( CAST(strftime('%d', date) as integer) <= 15, DATE(date, 'start of month'), DATE(date, 'start of month', '+15 day')) as bucket,
             IIF(jobGroup = 'A', 20 * sum(hours), 30 * sum(hours) ) as amountPaid
        from employee
        group by id, bucket
        `
    const query2 = 'select * from employee'
    db.all(query1, (err, data) => {
        if (err) {
            res.status(400)
            res.send('error retrieving pay-roll report')
        }
        data = data.map(row => {
            let endDate
            const bucket = moment(row.bucket, 'YYYY-MM-DD')
            const day = parseInt(bucket.format('DD'))
            if (day === 1) {
                endDate = bucket.add('days', 14).format('YYYY-MM-DD')
            } else {
                endDate = bucket.endOf('month').format('YYYY-MM-DD')
            }
            return {...row, "payPeriod": {
                startDate: row.bucket, endDate: endDate
                }
            }
        })
        console.log('loggingdb in route', data);
        res.send(data)
    })
}

module.exports = payrollReport
