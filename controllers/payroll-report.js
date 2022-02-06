const db = require('../clients')

const payrollReport = (req, res) => {
    const query1 = `
        select 
             id as employeeId,
             IIF( CAST(strftime('%d', date) as integer) <= 15, DATE(date, 'start of month'), DATE(date, 'start of month', '+15 day')) as bucket,
             date,
             hours,
             jobGroup,
             IIF(jobGroup = 'A', 20 * sum(hours), 30 * sum(hours) ) as amountPaid
        from employee
        group by id, bucket
        `
    const query2 = 'select * from employee'
    db.all(query1, (err, row) => {
        console.log('loggingdb in route', row);
        res.send(row)
    })
}

module.exports = payrollReport
