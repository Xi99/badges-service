const { Pool } = require("pg");
const pool = new Pool({
  host: "http://45.77.144.145",
  database: "badge_service",
  port: 5432,
});

const getAllBadges = async () => {
  try{
  const res = await pool.query("SELECT * FROM badges");
  return res.rows;
  } catch (error) {
    console.log('That did not go well...')
    throw error
  }
};

const addBadge = async (badge) => {
  let values = [badge.name, badge.label, badge.company];
  await pool
        .query("INSERT INTO badges (name, label, company) VALUES($1, $2, $3)", values);
    return true;
};

module.exports = {
  getAllBadges,
  addBadge
};