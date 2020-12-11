require('dotenv').config()

const {Pool} = require('pg')
const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
})

const {Client} = require('pg')
const client = new Client({
  user:"faridzam",
  password: "zamzam870",
  host: "localhost",
  port: 5432,
  database: "orders"
})

client.connect()
.then(() => console.log("connection successfuly"))
.catch(e => console.log)
.finally(() => client.end())

module.exports = {pool, client}