import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createConnection({
  host     : process.env.MYSQL_ADDON_HOST,
  database : process.env.MYSQL_ADDON_DB,
  user     : process.env.MYSQL_ADDON_USER,
  password : process.env.MYSQL_ADDON_PASSWORD
})

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});