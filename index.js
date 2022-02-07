const port = 3000

const app = require('./server/index')

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app

// todo: tests
// todo: put jobgroup on different table
// todo: dont insert if already exists
// todo: dependency injection sql client

// todo: fix query to have nested object
// todo: clean up client

// todo: make script for creating table
// todo: hide bucket
