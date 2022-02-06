const db = require('../services/clients')

db.run("CREATE TABLE employee (Date date, Hours integer, Id integer, JobGroup char(1))");
