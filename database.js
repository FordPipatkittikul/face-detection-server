require('dotenv').config();

const hostname = process.env.HOST;
const username = process.env.USERNAMEE;
const database = process.env.DATABASE;
const password = process.env.PASSWORD;


module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: hostname,
        port: 5432,
        user: username,
        password: password,
        database: database,
        ssl:true
      },
    },
};


console.log(hostname)
console.log(username)
console.log(password)
console.log(database)