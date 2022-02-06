const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// db.run("CREATE TABLE employee (Date date, Hours integer, Id integer, JobGroup char(1))");


// db.run("INSERT INTO employee VALUES ('4/1/2023',1, 8, 'A')");

// const stmt = db.prepare("INSERT INTO employee VALUES (?,?,?,?)");
// for (let i = 0; i < 10; i++) {
//     stmt.run(['asdf', 123, 123, 'A']);
// }
// stmt.finalize();

// db.run('DROP TABLE employee');
// db.run('DELETE FROM employee');

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

// db.each(query2, function(err, row) {
//     console.log('loggingdb', row);
// });
db.run(query2, (data) => {
    console.log(data)
})


module.exports = db;
