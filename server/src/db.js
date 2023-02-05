import { createPool } from "mysql2/promise"
import './config.js'

const conn = createPool({
    host: process.env.HOST, 
    user: process.env.USER, 
    password: process.env.PASSWORD, 
    port: process.env.PORT, 
    database: process.env.DATABASE, 
})


conn.getConnection((err, connection) => { 
    if (err) {
        switch (err.code) {
          case "ECONNREFUSED":
            console.log(
              "\x1b[93m[MySQL] \x1b[97mError: Check your connection details (packages/mysql/mysql.js) or make sure your MySQL server is running. \x1b[39m"
            );
            break;
          case "ER_BAD_DB_ERROR":
            console.log(
              "\x1b[91m[MySQL] \x1b[97mError: The database name you've entered does not exist. \x1b[39m"
            );
            break;
          case "ER_ACCESS_DENIED_ERROR":
            console.log(
              "\x1b[91m[MySQL] \x1b[97mError: Check your MySQL username and password and make sure they're correct. \x1b[39m"
            );
            break;
          case "ENOENT":
            console.log(
              "\x1b[91m[MySQL] \x1b[97mError: There is no internet connection. Check your connection and try again. \x1b[39m"
            );
            break;
          default:
            console.log("\x1b[91m[MySQL] \x1b[97mError: " + err.code + " \x1b[39m");
            break;
        }
      } else {
        console.log("\x1b[92m[MySQL] \x1b[97mConnected Successfully \x1b[39m");
      }
})

export default conn