const { Pool } = require("pg");
require("dotenv").config();
const db = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost:5432/classroom_manager",
});

async function query(sql, params, callback) {
  return db.query(sql, params, callback);
}

module.exports = { query };
