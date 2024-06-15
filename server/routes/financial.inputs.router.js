const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = 
    require('../modules/authentication-middleware');

/**rejectUnauthenticated,
 * GET all monthly inputs for a user
 */
router.get('/',  async (req, res) => {
    try {
        let connection;
        connection = await pool.connect();
        userId = user.id;
        sqlText = `
            SELECT * 
                FROM monthly_inputs
                WHERE user_id = $1
                ORDER BY year, month;
            `;
            const dbResponse = await connection.query(sqlText, [userId]);
            console.log('Get of monthly inputs in /api/financial_inputs succesful:', dbResponse.rows )
            connection.release();
            send(dbResponse.rows);
    } catch (error) {
        console.log('Error in get of monthly inputs in /api/financial_inputs', error);
        connection.release();
        sendStatus(500);
    }
})

/**
 * GET a single month's inputs for a user
 */
router.get('/:month&:year',  async (req, res) => {
    let connection;
    try {
        connection = await pool.connect();
        month = req.params.month;
        year = req.params.year;
        // userId = user.id;
        userId = 1;
        sqlText = `
            SELECT * 
                FROM monthly_inputs
                WHERE user_id = $1
                    AND month = $2
                    AND year = $3
                ORDER BY year, month;
            `;
            const dbResponse = await connection.query(sqlText, [userId, month, year]);
            console.log('Get of single month\'s inputs in /api/financial_inputs/:month&:year succesful:', dbResponse.rows )
            connection.release();
            res.send(dbResponse.rows);
    } catch (error) {
        console.log('Error in get of single month\'s inputs in /api/financial_inputs/:month&:year', error);
        connection.release();
        res.sendStatus(500);
    }
})

/**
 * POST / ADD a single month's input for a user
 */
router.post('/',  async (req, res) => {
   try {
       let connection;
       connection = await pool.connect();
       month = req.body.month;
       year = req.body.year;
       netIncome = req.body.netIncome;
       sales = req.body.sales;
       assets = req.body.assets;
       equity = req.body.equity;
       taxRate = req.body.taxRate;
       earningBeforeTaxes = req.body.earningBeforeTaxes;
       userId = user.id;
       sqlText = `
           INSERT INTO monthly_inputs
                (user_id, 
                 year,
                 month,
                 net_income,
                 sales,
                 assets,
                 equity,
                 tax_rate,
                 earning_before_taxes )
                VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 );
           `;
           const dbResponse = 
                await connection.query(sqlText, [userId,
                                                 month,
                                                 year,
                                                 netIncome,
                                                 sales,
                                                 assets,
                                                 equity,
                                                 taxRate,
                                                 earningBeforeTaxes ]);
           console.log('POST of a single month\'s data in /api/financial_input/ successful:', dbResponse.rows )
           connection.release();
           sendStatus(201);
   } catch (error) {
       console.log('Error in POST of single month\'s inputs in /api/financial_inputs/', error);
       connection.release();
       sendStatus(500);
   }
})

/**
 * PUT / UPDATE a single month's inputs for a user
 */
router.post('/',  async (req, res) => {
    try {
        let connection;
        connection = await pool.connect();
        month = req.body.month;
        year = req.body.year;
        netIncome = req.body.netIncome;
        sales = req.body.sales;
        assets = req.body.assets;
        equity = req.body.equity;
        taxRate = req.body.taxRate;
        earningBeforeTaxes = req.body.earningBeforeTaxes;
        userId = user.id;
        sqlText = `
            UPDATE monthly_inputs
                SET year = $2,
                    month = $3,
                    net_income = $4,
                    sales = $5,
                    assets = $6,
                    equity = $7,
                    tax_rate = $8,
                    earning_before_taxes = $9
                WHERE user_id = $1;
            `;
            const dbResponse = 
                 await connection.query(sqlText, [userId,
                                                  month,
                                                  year,
                                                  netIncome,
                                                  sales,
                                                  assets,
                                                  equity,
                                                  taxRate,
                                                  earningBeforeTaxes ]);
            console.log('PUT of a single month\'s data in /api/financial_input/ successful:', dbResponse.rows )
            connection.release();
            sendStatus(201);
    } catch (error) {
        console.log('Error in PUT of single month\'s inputs in /api/financial_inputs/', error);
        connection.release();
        sendStatus(500);
    }
 })


module.exports = router;

