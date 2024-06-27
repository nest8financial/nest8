const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET of all products
 */
router.get("/",  async (req, res ) => {
let connection;
connection = await pool.connect();
try {

  const sqlText = `
  SELECT * 
    FROM product
    ORDER by id;
  `
const dbResponse = await connection.query(sqlText)
console.log('Get of all products successful: ', dbResponse.rows)
connection.release()
res.send(dbResponse.rows)

}
catch(err) {
    console.log('Error in get of products', err);
    connection.release()
    res.sendStatus(500)
}
});


module.exports = router;