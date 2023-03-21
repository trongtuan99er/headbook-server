import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});