const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  database: "badges-service",
  port: 5432,
});

const [name] = async () => {
  try{
  const res = await pool.query("SELECT * FROM [name]");
  return res.rows;
  } catch (error) {
    console.log('That did not go well.')
    throw error
  }
};

module.exports = {
  
};