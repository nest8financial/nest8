const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET of all industries
 */
router.get("/",  async (req, res ) => {
let connection;
connection = await pool.connect();
try {

  const sqlText = `
  SELECT * FROM industry;
  `
const dbResponse = await connection.query(sqlText)
console.log('get industries successful: ', dbResponse.rows)
connection.release()
res.send(dbResponse.rows)

}
catch(err) {
    console.log('Error in get industry  oww something went wrong', err);
    connection.release()
    res.sendStatus(500)
}
});
/**
//  * POST route template
//  */
// router.post("/", (req, res) => {
//   // POST route code here
// });

module.exports = router;
