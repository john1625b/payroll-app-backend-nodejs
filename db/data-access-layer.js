class DataAccessLayer {
    constructor(database) {
        this.database = database
    }

    getPayRollReport (handleEmployeeSelection)  {
        const query1 = `
            SELECT 
                 id as employeeId,
                 IIF( CAST(strftime('%d', date) as integer) <= 15, DATE(date, 'start of month'), DATE(date, 'start of month', '+15 day')) as bucket,
                 IIF(jobGroup = 'A', 20 * sum(hours), 30 * sum(hours) ) as amountPaid
            FROM employee
            GROUP BY id, bucket
            `
        this.database.all(query1, handleEmployeeSelection)
    }

    insertIntoEmployee (rows) {
        const stmt = this.database.prepare("INSERT INTO employee VALUES (?,?,?,?)");
        rows.map(row => {
            stmt.run(Object.values(row));
        })
        stmt.finalize();
    }
}

module.exports = DataAccessLayer