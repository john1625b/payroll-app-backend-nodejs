class DataAccessLayer {
    constructor(database) {
        this.database = database
    }

    getPayRollReport (handleResponse)  {
        const query = `
            SELECT 
                 id as employeeId,
                 IIF( CAST(strftime('%d', date) as integer) <= 15, DATE(date, 'start of month'), DATE(date, 'start of month', '+15 day')) as bucket,
                 IIF(jobGroup = 'A', 20 * sum(hours), 30 * sum(hours) ) as amountPaid
            FROM employee
            GROUP BY id, bucket
            `
        this.database.all(query, handleResponse)
    }

    insertIntoEmployee (rows) {
        const insertion = `INSERT INTO employee VALUES (?,?,?,?)`
        const csvIdColumnName = 'employee id'
        const stmt = this.database.prepare(insertion);
        try {
            rows.map(row => {
                this.database.all(`SELECT id from employee WHERE id = ${row[csvIdColumnName]}`,
                    (err, res) => {
                        // only insert if it does not already exist
                        if (res.length === 0) {
                            stmt.run(Object.values(row))
                        }
                })
            })
        } catch (e) {
            console.error(e)
            return e
        }
    }
}

module.exports = DataAccessLayer