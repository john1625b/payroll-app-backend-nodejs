const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// db.run("CREATE TABLE employee (Date date, Id integer, Hours integer, JobGroup char(1))");


// db.run("INSERT INTO employee VALUES ('4/1/2023',1, 8, 'A')");

// const stmt = db.prepare("INSERT INTO employee VALUES (?,?,?,?)");
// for (let i = 0; i < 10; i++) {
//     stmt.run(['asdf', 123, 123, 'A']);
// }
// stmt.finalize();

// db.run('DELETE FROM employee');

db.each("SELECT * FROM employee", function(err, row) {
    console.log('loggingdb', row);
});

module.exports = db;
