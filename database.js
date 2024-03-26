require('dotenv').config();

const hostname = process.env.HOST;
const username = process.env.USERNAMEE;
const database = process.env.DATABASE;
const password = process.env.PASSWORD;


module.exports = {
    development: {
      client: 'pg',
      connection: {
        connectionString: process.env.DATABASE_URL,
        host: hostname,
        port: 5432,
        user: username,
        password: password,
        database: database,
        ssl:{rejectUnauthorized: false}
      },
    },
};


console.log(hostname)
console.log(username)
console.log(password)
console.log(database)