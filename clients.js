const postgres = require('postgres')

const sql = postgres('postgres://username:password@host:port/database', {
    host        : 'ec2-34-226-18-183.compute-1.amazonaws.com',         // Postgres ip address or domain name
    port        : 5432,       // Postgres server port
    path        : '',         // unix socket path (usually '/tmp')
    database    : 'd98e864197k696',         // Name of database to connect to
    username    : 'mgckqpzkxfbeap',         // Username of database user
    password    : '155df649be549fe21d05e03a70c6d5a25b88e76ff9597d1ef27fc6888c9dc6ac',         // Password of database user
    ssl         : false,      // True, or options for tls.connect
    max         : 10,         // Max number of connections
    timeout     : 0,          // Idle connection timeout in seconds
    types       : [],         // Array of custom types, see more below
    connection  : {
        application_name  : 'postgres.js', // Default application_name
        ...                                // Other connection parameters
    }
})

module.exports = sql